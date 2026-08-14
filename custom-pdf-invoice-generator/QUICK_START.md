# Quick Start Guide - Kenning AutoGlass Invoice Generator

## What You Have

✅ A professional invoice generator web application  
✅ Customer database with searchable dropdown  
✅ PDF download capability  
✅ Your company branding and banking details  

---

## Using It Right Now (On This Computer)

### Start the Application:

1. Open Terminal/Command Prompt
2. Navigate to your app folder:
   ```bash
   cd path/to/your/invoice-app
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open your browser and go to: `http://localhost:3000`

### Create Your First Invoice:

1. **Search Customer**
   - Click the search box
   - Type a customer name (or click "+ Add New Customer")

2. **For New Customer:**
   - Choose: "Individual" or "Company"
   - Fill in details
   - Keep the ✅ checkbox to save them

3. **Add Items:**
   - Enter service description (e.g., "Windshield Replacement")
   - Enter quantity and price
   - Click "+ Add Item" for more services

4. **Generate PDF:**
   - Click "Generate Invoice"
   - Click "Download PDF" or "Save & Download"
   - Done! Send to customer 📧

---

## Using It From Other Computers

### Option 1: Deploy to Cloud (Recommended)
**Access from anywhere - FREE**

Follow the **DEPLOYMENT_GUIDE.md** for:
- ✅ Vercel deployment (easiest - 15 minutes)
- ✅ Free hosting + database
- ✅ Get a URL like: `kenning-invoices.vercel.app`
- ✅ Access from any device with internet

### Option 2: Local Network Only
**Access from computers in your office**

See **DEPLOYMENT_GUIDE.md** Section: "Local Network Access"
- ✅ Free
- ✅ Only works on same WiFi
- ✅ 10-minute setup

---

## Features Overview

### 🔍 Smart Search
- Type to search customers instantly
- Filters as you type
- Shows customer phone numbers
- Supports hundreds of customers

### 💾 Auto-Save Customers
- Checkbox to save new customers
- Customers appear in dropdown immediately
- Never type the same info twice

### 🎨 Professional Branding
- Your logo on every invoice
- Company details automatically included
- Clean, Excel-style layout

### 💳 Banking Details
- Standard Bank details on every invoice
- Account: 10245845745
- Easy for customers to pay

### 📄 PDF Download
- High-quality PDF invoices
- Ready to email
- Professional appearance

---

## Tips & Tricks

### Searching Customers
- ✨ Type partial names: "toyo" finds "Toyota Dealership"
- ✨ Search by company or person name
- ✨ Click outside dropdown to close it

### Adding Companies vs Individuals
- 👤 **Individual:** Click "Individual Customer" → Enter person's name
- 🏢 **Company:** Click "Company" → Enter company name
- ✅ Both save to searchable dropdown

### Faster Invoice Creation
1. Select previous customer from dropdown
2. All details fill automatically
3. Just add new items
4. Generate and download!

### Editing Invoices
- Click "← Back to Edit" after generating
- Make changes
- Generate again

---

## Common Questions

### Q: How do I find a customer quickly?
**A:** Click the search box and start typing any part of their name.

### Q: How do I add a company to the list?
**A:** 
1. Select "+ Add New Customer"
2. Click "Company" button
3. Enter company details
4. Keep ✅ checked
5. Click "Generate Invoice" (company is now saved!)

### Q: Can I use this on my phone?
**A:** Yes! The app is fully responsive. Deploy to cloud (Vercel) and access from any device.

### Q: Where are invoices saved?
**A:** 
- PDFs are downloaded to your computer
- Invoice records are saved in the database (if you click "Save & Download")

### Q: Can I access this from home?
**A:** Yes, if you deploy to cloud (Vercel). See DEPLOYMENT_GUIDE.md

### Q: Do I need internet?
**A:** 
- Local use (localhost): No internet needed
- Cloud deployment: Yes, internet required
- Local network: Internet not needed, just same WiFi

---

## Getting Help

### For Technical Issues:
1. Check DEPLOYMENT_GUIDE.md
2. Check HOW_TO_ADD_COMPANY.md
3. Look at the README.md

### For Deployment Help:
- See DEPLOYMENT_GUIDE.md (detailed step-by-step)
- Recommended: Vercel (easiest option)

---

## Next Steps

### To Use from Multiple Computers:

**Easiest:** Deploy to Vercel (15 minutes)
1. Create GitHub account
2. Upload code to GitHub
3. Deploy to Vercel (free)
4. Get your URL
5. Access from anywhere! 🌍

**See full instructions in:** `DEPLOYMENT_GUIDE.md`

---

## Summary

✅ **Local Use:** `npm run dev` → `localhost:3000`  
✅ **Search:** Type to find customers instantly  
✅ **Add Company:** Select type → Enter name → Generate  
✅ **Cloud Access:** Deploy to Vercel (see guide)  

**You're ready to create professional invoices!** 🚗✨
