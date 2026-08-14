import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { invoices, invoiceItems } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      invoiceNumber,
      customerName,
      customerCompany,
      customerAddress,
      customerEmail,
      customerPhone,
      invoiceDate,
      dueDate,
      items,
      subtotal,
      total,
    } = body;

    // Insert invoice
    const [invoice] = await db.insert(invoices).values({
      invoiceNumber,
      customerName,
      customerCompany,
      customerAddress,
      customerEmail,
      customerPhone,
      invoiceDate: new Date(invoiceDate),
      dueDate: new Date(dueDate),
      subtotal,
      total,
    }).returning();

    // Insert invoice items
    if (items && items.length > 0) {
      const itemsToInsert = items.map((item: any) => ({
        invoiceId: invoice.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice.toString(),
        total: (item.quantity * item.unitPrice).toFixed(2),
      }));

      await db.insert(invoiceItems).values(itemsToInsert);
    }

    return NextResponse.json({ success: true, invoice }, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const allInvoices = await db.select().from(invoices).orderBy(invoices.createdAt);
    return NextResponse.json({ success: true, invoices: allInvoices });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}
