import { pgTable, serial, text, timestamp, integer, decimal } from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  company: text('company'),
  address: text('address'),
  email: text('email'),
  phone: text('phone'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey(),
  invoiceNumber: text('invoice_number').notNull().unique(),
  customerId: integer('customer_id').references(() => customers.id),
  customerName: text('customer_name').notNull(),
  customerCompany: text('customer_company'),
  customerAddress: text('customer_address'),
  customerEmail: text('customer_email'),
  customerPhone: text('customer_phone'),
  invoiceDate: timestamp('invoice_date').notNull().defaultNow(),
  dueDate: timestamp('due_date').notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const invoiceItems = pgTable('invoice_items', {
  id: serial('id').primaryKey(),
  invoiceId: integer('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),
  description: text('description').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
});
