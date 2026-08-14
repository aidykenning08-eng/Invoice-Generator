# Complete Vercel Deployment Guide - Step by Step

This guide will walk you through deploying your Kenning AutoGlass Invoice Generator to Vercel.

## Prerequisites

✅ All your invoice app files  
✅ A GitHub account (free)  
✅ A Vercel account (free)  
✅ 30 minutes of time  

---

## Part 1: Prepare Your Code for GitHub

### Step 1: Create a GitHub Account

1. Go to https://github.com
2. Click "Sign up"
3. Enter your email, create a password, choose a username
4. Verify your email
5. ✅ Done!

### Step 2: Create a New Repository

1. Log in to GitHub
2. Click the **"+"** icon in the top-right
3. Click **"New repository"**
4. Fill in:
   - **Repository name:** `kenning-invoice-generator`
   - **Description:** "Invoice generator for Kenning AutoGlass"
   - **Visibility:** Private (recommended) or Public
5. **DO NOT** check "Add a README file"
6. Click **"Create repository"**
7. ✅ You now have an empty repository!

### Step 3: Upload Your Code to GitHub

**Option A: Using GitHub Web Interface (Easiest)**

1. In your new repository, click **"uploading an existing file"**
2. Drag and drop ALL your invoice app files and folders
3. Important files to include:
   - `src/` folder (entire folder)
   - `public/` folder (if you have it)
   - `package.json`
   - `package-lock.json`
   - `next.config.ts`
   - `tsconfig.json`
   - `tailwind.config.ts` (if exists)
   - `postcss.config.mjs`
   - `vercel.json`
   - `drizzle.config.json`
   - `.env.example` (create this - see below)
4. **DO NOT upload:**
   - `node_modules/` folder
   - `.next/` folder
   - `.env` file (contains secrets)
5. Scroll down and click **"Commit changes"**
6. ✅ Your code is on GitHub!

**Option B: Using Git Command Line**

```bash
# Navigate to your project folder
cd path/to/your/invoice-app

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add GitHub remote (replace YOUR-USERNAME and YOUR-REPO)
git remote add origin https://github.com/YOUR-USERNAME/kenning-invoice-generator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Create .env.example File

Create a file called `.env.example` with this content:

```
# Database Configuration
# You will get this from Vercel Postgres
DATABASE_URL=postgresql://user:password@host:5432/database

# Add this file to your repository
# DO NOT add your actual .env file with real credentials
```

Upload this to GitHub too.

---

## Part 2: Deploy to Vercel

### Step 1: Create a Vercel Account

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account
5. ✅ You're logged in!

### Step 2: Import Your Repository

1. Click **"Add New..."** → **"Project"**
2. Find your repository: `kenning-invoice-generator`
3. Click **"Import"**
4. Vercel will auto-detect it's a Next.js project ✅

### Step 3: Configure Build Settings

On the "Configure Project" page:

1. **Framework Preset:** Next.js (should be auto-selected)
2. **Root Directory:** ./ (leave as default)
3. **Build Command:** `npm run build` (should be auto-filled)
4. **Install Command:** `npm install` (should be auto-filled)
5. **Output Directory:** .next (should be auto-filled)

**DO NOT click Deploy yet!** We need to add the database first.

### Step 4: Add Environment Variables (Temporary)

For now, add a placeholder so the build doesn't fail:

1. Expand **"Environment Variables"** section
2. Add:
   - **Name:** `DATABASE_URL`
   - **Value:** `postgresql://placeholder:placeholder@placeholder:5432/placeholder`
3. Click **"Add"**

We'll replace this with the real database URL in the next step.

### Step 5: Deploy (First Time)

1. Click **"Deploy"**
2. Wait 2-3 minutes while Vercel builds your app
3. You'll see:
   - ✅ Building... (Installing dependencies, running build)
   - ✅ Deploying...
   - 🎉 **Congratulations!** Your app is deployed!

### Step 6: View Your App

1. Click **"Visit"** or go to the URL shown (like `kenning-invoice-generator.vercel.app`)
2. You should see your invoice generator! 🎉
3. **Note:** Database features won't work yet (customers, saving invoices) - we'll fix that next!

---

## Part 3: Add PostgreSQL Database

### Step 1: Create Vercel Postgres Database

1. In your Vercel project dashboard, click the **"Storage"** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Click **"Continue"**

### Step 2: Configure Database

1. **Database Name:** `kenning-invoices` (or any name you like)
2. **Region:** Choose closest to your location (e.g., Washington D.C. for US)
3. Click **"Create"**
4. Wait 1-2 minutes for database creation
5. ✅ Database created!

### Step 3: Connect Database to Your Project

1. Click **"Connect Project"**
2. Select your project: `kenning-invoice-generator`
3. Vercel will automatically add all database environment variables! ✅
4. Click **"Connect"**

**Vercel automatically adds these environment variables to your project:**
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- etc.

### Step 4: Update Environment Variable

1. Go to your project **"Settings"** tab
2. Click **"Environment Variables"** in the sidebar
3. Find `DATABASE_URL`
4. Delete the old placeholder value
5. Click **"Add New"**
6. Add:
   - **Name:** `DATABASE_URL`
   - **Value:** Copy the value from `POSTGRES_URL` (shown above in the list)
7. Click **"Save"**

### Step 5: Redeploy

1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Check **"Use existing Build Cache"** (faster)
5. Click **"Redeploy"**
6. Wait 1-2 minutes
7. ✅ Your app is now redeployed with database!

---

## Part 4: Set Up Database Tables

### Step 1: Access Database

1. In Vercel, go to **"Storage"** tab
2. Click on your database: `kenning-invoices`
3. Click **".Query"** tab or **"Data"** tab

### Step 2: Run Database Migrations

**Option A: Using Vercel CLI (Recommended)**

1. Install Vercel CLI on your computer:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Link your project:
   ```bash
   cd path/to/your/invoice-app
   vercel link
   ```

4. Pull environment variables:
   ```bash
   vercel env pull .env.local
   ```

5. Run database push:
   ```bash
   npx drizzle-kit push
   ```

**Option B: Using SQL Query (Manual)**

1. In Vercel Storage → Query tab
2. Copy and paste this SQL:

```sql
-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  address TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  customer_id INTEGER REFERENCES customers(id),
  customer_name TEXT NOT NULL,
  customer_company TEXT,
  customer_address TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  invoice_date TIMESTAMP NOT NULL DEFAULT NOW(),
  due_date TIMESTAMP NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create invoice_items table
CREATE TABLE IF NOT EXISTS invoice_items (
  id SERIAL PRIMARY KEY,
  invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL
);
```

3. Click **"Run Query"**
4. ✅ Tables created!

---

## Part 5: Test Your App

### Step 1: Visit Your App

Go to your Vercel URL: `https://kenning-invoice-generator.vercel.app`

### Step 2: Test Customer Creation

1. Click the search box
2. Select "+ Add New Customer"
3. Choose "Company"
4. Enter: "Test Company Ltd"
5. Add email and phone
6. Keep the checkbox checked
7. Add an invoice item
8. Click "Generate Invoice"
9. ✅ Customer should be saved!

### Step 3: Test Customer Search

1. Click "← Back to Edit"
2. Click the search box
3. Type "test"
4. ✅ You should see "Test Company Ltd"!

### Step 4: Test PDF Download

1. Generate an invoice
2. Click "🖨️ Print / Save as PDF"
3. Select "Save as PDF"
4. ✅ PDF should download!

---

## Part 6: Custom Domain (Optional)

### Using Your Own Domain

1. In Vercel project, go to **"Settings"** → **"Domains"**
2. Click **"Add"**
3. Enter: `invoices.kenningautoglass.co.za`
4. Vercel will show you DNS records to add
5. Go to your domain registrar (where you bought kenningautoglass.co.za)
6. Add the DNS records Vercel shows you:
   - **Type:** CNAME
   - **Name:** invoices
   - **Value:** cname.vercel-dns.com
7. Wait 5-60 minutes for DNS to propagate
8. ✅ Your app is at: `invoices.kenningautoglass.co.za`

---

## Troubleshooting

### Issue: "404 Not Found"

**Solution:**
1. Check that `vercel.json` is in your repository
2. Make sure all files are uploaded to GitHub
3. Redeploy the project
4. Check build logs for errors

### Issue: "Database Connection Error"

**Solution:**
1. Verify `DATABASE_URL` environment variable is set
2. Make sure you connected the Postgres database to your project
3. Check the database is active in Storage tab
4. Redeploy after adding environment variables

### Issue: "Build Failed"

**Solution:**
1. Click on the failed deployment
2. Read the error logs
3. Common fixes:
   - Make sure `package.json` is uploaded
   - Check that all imports are correct
   - Verify TypeScript has no errors locally
4. Fix the issue and push to GitHub (auto-redeploys)

### Issue: "Customers Not Saving"

**Solution:**
1. Check database tables are created
2. Verify `DATABASE_URL` is set correctly
3. Check browser console for errors
4. Test the API route: `/api/customers`

### Issue: "Logo Not Showing"

**Solution:**
- The logo loads from kenningautoglass.co.za
- Make sure the website is online
- Check CORS settings on your website
- Fallback: Download logo and put in `public/logo.png`

---

## Environment Variables Reference

Your Vercel project should have:

```
DATABASE_URL=postgresql://...
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
```

All set automatically when you connect Vercel Postgres!

---

## Maintenance

### Updating Your App

1. Make changes to your code locally
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Updated invoice features"
   git push
   ```
3. Vercel automatically redeploys! ✅

### Viewing Logs

1. Go to Vercel project
2. Click **"Deployments"**
3. Click on any deployment
4. View logs for errors or issues

### Database Backup

Vercel Postgres has automatic backups! You can also:
1. Go to Storage → Your database
2. Click "Settings"
3. View backup options

---

## Success Checklist

✅ GitHub repository created  
✅ Code uploaded to GitHub  
✅ Vercel account created  
✅ Project deployed to Vercel  
✅ PostgreSQL database created  
✅ Database connected to project  
✅ Environment variables configured  
✅ Database tables created  
✅ App tested and working  
✅ Custom domain added (optional)  

---

## Your URLs

After deployment, you'll have:

**Vercel URL:** `https://kenning-invoice-generator.vercel.app`  
**Custom URL (optional):** `https://invoices.kenningautoglass.co.za`  
**Database Dashboard:** Access via Vercel → Storage  

---

## Cost

**Everything is FREE on Vercel's hobby plan:**
- ✅ Hosting
- ✅ SSL Certificate
- ✅ PostgreSQL Database (256MB free)
- ✅ Automatic deployments
- ✅ Custom domain

**Limits:**
- 100GB bandwidth/month (more than enough)
- Database: 256MB (thousands of invoices)
- No credit card required!

---

## Need Help?

1. Check this guide again
2. Read error messages in Vercel logs
3. Check Vercel documentation: https://vercel.com/docs
4. GitHub issues or community support

---

## Summary

1. **Upload code to GitHub** (15 min)
2. **Deploy to Vercel** (5 min)
3. **Add PostgreSQL database** (5 min)
4. **Set up tables** (5 min)
5. **Test everything** (5 min)
6. **Done!** ✅

Total time: ~30 minutes

Your invoice generator will be live at:
`https://kenning-invoice-generator.vercel.app`

Access from anywhere, any device! 🎉
