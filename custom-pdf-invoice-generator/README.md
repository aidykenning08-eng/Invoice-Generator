# Kenning AutoGlass - Invoice Generator

A professional invoice generator application built for Kenning AutoGlass.

## Features

- 👥 **Smart Customer Management** 
  - 🔍 **Searchable dropdown** to quickly find customers
  - Type to search by name or company
  - Shows customer count and phone numbers
  - Choose between Individual or Company customer types
  - Only relevant fields shown based on customer type
  - Auto-save checkbox or manual save button
  
- 📝 **Easy Invoice Creation** - Simple form to enter customer details and line items
- 🎨 **Branded Invoices** - Professional invoices with your company logo
- 💳 **Banking Details** - Invoices include Standard Bank payment information  
- 📄 **PDF Download** - Download invoices as PDF files to send to clients
- 💾 **Database Storage** - Save invoices and customers for future reference
- 🔢 **Auto-generated Invoice Numbers** - Unique invoice numbers in format KAG-YEAR-XXXXXX
- 💰 **Automatic Calculations** - Automatic subtotal and total calculations
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 📋 **Excel-style Invoice Format** - Clean, simple invoice layout inspired by standard Excel templates

## How to Use

1. **Search and Select Customer**
   - Click the search box and start typing to search
   - Search by customer name or company name
   - Results filter automatically as you type
   - Click "+ Add New Customer" to add a new one
   - Customer details auto-fill when selecting existing customers

2. **Choose Customer Type** (for new customers)
   - Select **"Individual Customer"** for personal customers
   - Select **"Company"** for business customers
   - Only one field will be shown based on your selection

3. **Fill in Customer Details** (for new customers)
   - For individuals: Enter customer name
   - For companies: Enter company name
   - Add address, email, and phone (optional)
   - Check "Save this customer for future invoices" to remember them
   - You can also click "💾 Save Customer" button anytime

4. **Set Invoice Date**
   - Date: Invoice date (defaults to today)

5. **Add Line Items**
   - Enter service description (e.g., "Windshield Replacement")
   - Set quantity and unit price
   - Total is calculated automatically
   - Click "+ Add Item" to add more services
   - Click "✕" to remove an item

6. **Generate Invoice**
   - Click "Generate Invoice" to preview
   - Review the invoice with your branding and banking details
   - Choose to:
     - **🖨️ Print / Save as PDF** - Most reliable method (works on all browsers)
     - **📄 Download PDF** - Direct download
     - **💾 Save & Download PDF** - Save to database and download PDF
   - Click "← Back to Edit" to make changes

**💡 Tip:** If PDF download doesn't work, use the "Print / Save as PDF" button - it works 100% of the time on all browsers!

## Company Information

The following company details are automatically included on all invoices:
- **Business Name:** Kenning AutoGlass
- **Logo:** Professional company branding
- **Phone:** 079 987 6164
- **Email:** kenningautoglass@polka.co.za

## Banking Information

Banking details are automatically displayed on all invoices:
- **Bank:** Standard Bank
- **Account Number:** 10245845745

## Invoice Format

Each invoice includes:
- Kenning AutoGlass logo and branding
- Auto-generated invoice number (KAG-YEAR-XXXXXX)
- Invoice date and due date
- Customer information (name, company, address, contact details)
- Itemized list of services with quantities and prices
- Subtotal and total amount in South African Rand (R)
- Banking details for payment (Standard Bank)
- Professional footer with payment instructions

## Technical Details

Built with:
- Next.js 16 (App Router)
- PostgreSQL with Drizzle ORM
- Tailwind CSS
- jsPDF for PDF generation
- TypeScript

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Database

The application uses PostgreSQL to store records. The database schema includes:
- `customers` table - Stores customer information for easy reuse
- `invoices` table - Stores invoice header information
- `invoice_items` table - Stores line items for each invoice

To apply database schema changes:
```bash
npx drizzle-kit push
```

## Notes

- The logo is currently loaded from your website (kenningautoglass.co.za)
- **To use your own logo:** See `HOW_TO_CHANGE_LOGO.md` for complete instructions
- Customer information is saved when creating invoices with new customers
- Previously used customers appear in the dropdown for quick selection
- All amounts are in South African Rand (R)
