# Pre-Deployment Checklist

Before uploading to Vercel, make sure you have all these files:

## ✅ Required Files (Must Have)

### Core Application Files
- [ ] `src/` folder (entire folder with all subfolders)
  - [ ] `src/app/` (pages and layouts)
  - [ ] `src/components/` (InvoiceForm, InvoicePreview)
  - [ ] `src/db/` (database configuration)

### Configuration Files
- [ ] `package.json` - Dependencies and scripts
- [ ] `package-lock.json` - Locked dependency versions
- [ ] `next.config.ts` - Next.js configuration
- [ ] `tsconfig.json` - TypeScript configuration
- [ ] `tailwind.config.ts` - Tailwind CSS configuration
- [ ] `postcss.config.mjs` - PostCSS configuration
- [ ] `drizzle.config.json` - Database configuration
- [ ] `vercel.json` - Vercel deployment configuration ✅ NEW
- [ ] `.env.example` - Environment variable template ✅ NEW
- [ ] `.gitignore` - Files to ignore in Git ✅ NEW

### Documentation Files (Optional but Recommended)
- [ ] `README.md`
- [ ] `VERCEL_DEPLOYMENT_STEPS.md` ✅ NEW
- [ ] `QUICK_START.md`
- [ ] `DEPLOYMENT_GUIDE.md`
- [ ] `PDF_TROUBLESHOOTING.md`
- [ ] `HOW_TO_ADD_COMPANY.md`

## ❌ DO NOT Upload These

- [ ] `node_modules/` folder - Too large, Vercel will install automatically
- [ ] `.next/` folder - Build output, Vercel will build
- [ ] `.env` file - Contains secrets! Use .env.example instead
- [ ] `.vercel/` folder - Vercel internal files
- [ ] Any `.log` files
- [ ] `.DS_Store` (Mac) or `Thumbs.db` (Windows)

## 🔍 Pre-Upload Verification

### 1. Check File Structure

Your project should look like this:

```
kenning-invoice-generator/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── customers/
│   │   │   │   └── route.ts
│   │   │   ├── health/
│   │   │   │   └── route.ts
│   │   │   └── invoices/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── InvoiceForm.tsx
│   │   └── InvoicePreview.tsx
│   └── db/
│       ├── index.ts
│       └── schema.ts
├── public/ (if you have it)
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── drizzle.config.json
├── vercel.json ✅
├── .env.example ✅
├── .gitignore ✅
└── [documentation files]
```

### 2. Verify package.json Scripts

Open `package.json` and verify these scripts exist:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
```

✅ All present

### 3. Test Local Build

Run these commands to make sure everything builds correctly:

```bash
# Clean install
rm -rf node_modules .next
npm install

# Type generation
npx next typegen

# TypeScript check
npm run typecheck

# Production build
npm run build

# If all pass ✅ you're ready!
```

### 4. Check Environment Variables

Make sure `.env.example` exists with this content:

```
DATABASE_URL=postgresql://user:password@localhost:5432/database
```

**Important:** 
- ✅ Upload `.env.example` to GitHub
- ❌ DO NOT upload `.env` (contains real credentials)

### 5. Verify vercel.json

Check that `vercel.json` exists and contains:

```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

✅ File created

## 📤 Upload Methods

### Method 1: GitHub Web Upload (Easiest)

1. Go to your GitHub repository
2. Click "Add file" → "Upload files"
3. Drag and drop ALL files and folders (except those in "DO NOT Upload" list)
4. Click "Commit changes"

### Method 2: Git Command Line

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit - Kenning AutoGlass Invoice Generator"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kenning-invoice-generator.git
git push -u origin main
```

## ⚠️ Common Upload Mistakes

### Mistake 1: Uploading node_modules
**Problem:** 500MB+ folder, takes forever  
**Solution:** Delete it before upload, listed in .gitignore

### Mistake 2: Uploading .env with secrets
**Problem:** Exposes database credentials  
**Solution:** Only upload .env.example

### Mistake 3: Missing src/ folder
**Problem:** App won't work  
**Solution:** Make sure entire src/ folder is uploaded

### Mistake 4: Missing package.json
**Problem:** Vercel can't install dependencies  
**Solution:** Always upload package.json and package-lock.json

## 🎯 Ready to Deploy?

If you can check all these:

- [ ] All required files present
- [ ] No forbidden files (node_modules, .env, .next)
- [ ] Local build passes (`npm run build` works)
- [ ] package.json has correct scripts
- [ ] .env.example exists
- [ ] .gitignore exists
- [ ] vercel.json exists

Then you're ready! Proceed to **VERCEL_DEPLOYMENT_STEPS.md**

## 🆘 Build Failing Locally?

If `npm run build` fails:

1. **Read the error message** - it usually tells you what's wrong
2. **Common fixes:**
   - Missing dependencies: `npm install`
   - TypeScript errors: Check the files mentioned in error
   - Import errors: Make sure all file paths are correct
3. **Check logs:**
   - `/tmp/build.log` for build errors
   - `/tmp/tsc.log` for TypeScript errors

Fix these BEFORE uploading to Vercel!

## ✅ Success Criteria

Your deployment is ready when:

1. ✅ `npm run build` completes successfully
2. ✅ No TypeScript errors
3. ✅ All required files present
4. ✅ .gitignore preventing sensitive files
5. ✅ .env.example template created

**You can now proceed to deploy to Vercel!**

Follow: **VERCEL_DEPLOYMENT_STEPS.md** for detailed deployment instructions.
