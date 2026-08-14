import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { customers } from '@/db/schema';
import { desc, eq, or, ilike } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');

    let query = db.select().from(customers);

    if (search) {
      query = query.where(
        or(
          ilike(customers.name, `%${search}%`),
          ilike(customers.company, `%${search}%`)
        )
      ) as any;
    }

    const allCustomers = await query.orderBy(desc(customers.updatedAt));
    return NextResponse.json({ success: true, customers: allCustomers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, company, address, email, phone } = body;

    // Check if customer already exists by name
    const existing = await db.select().from(customers).where(
      eq(customers.name, name)
    );

    if (existing.length > 0) {
      // Update existing customer
      const [updated] = await db.update(customers)
        .set({ 
          company,
          address, 
          email, 
          phone,
          updatedAt: new Date()
        })
        .where(eq(customers.id, existing[0].id))
        .returning();
      return NextResponse.json({ success: true, customer: updated });
    }

    // Create new customer
    const [customer] = await db.insert(customers).values({
      name,
      company,
      address,
      email,
      phone,
    }).returning();

    return NextResponse.json({ success: true, customer }, { status: 201 });
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}
