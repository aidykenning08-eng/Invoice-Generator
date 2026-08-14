# Vercel Deployment Error Fixes

Quick solutions for common Vercel deployment errors.

## Error: "404 Not Found"

### Symptoms
- You deployed successfully
- When you visit the URL, you see "404 - Page Not Found"
- Or you see a blank white page

### Causes & Solutions

#### Solution 1: Check if build completed
1. Go to Vercel dashboard
2. Click on your project
3. Click "Deployments"
4. Look for the latest deployment
5. If it says "Building..." wait for it to finish
6. If it says "Error" or "Failed" - click on it to see logs

#### Solution 2: Verify main page exists
1. Make sure `src/app/page.tsx` exists in your repository
2. Check GitHub to confirm the file is uploaded
3. If missing, upload it
4. Vercel will auto-redeploy

#### Solution 3: Check vercel.json
1. Make sure `vercel.json` is in the root of your repository
2. Content should be:
```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

#### Solution 4: Trigger redeploy
1. Go to Deployments tab
2. Click "..." on the latest deployment
3. Click "Redeploy"
4. Select "Use existing Build Cache"
5. Click "Redeploy"

---

## Error: "Build Failed" or "Error: Command failed"

### Symptoms
- Deployment shows "Failed" status
- Build logs show errors

### Solutions

#### Solution 1: Check build logs
1. Click on the failed deployment
2. Scroll through the logs
3. Look for the actual error (usually near the bottom)
4. Common errors and fixes below:

#### Solution 2: TypeScript errors
**Error message contains:** `Type error` or `TS2`

**Fix:**
1. Run `npm run typecheck` locally
2. Fix any TypeScript errors shown
3. Commit and push to GitHub

#### Solution 3: Missing dependencies
**Error message contains:** `Cannot find module` or `Module not found`

**Fix:**
1. Make sure `package.json` and `package-lock.json` are uploaded
2. Check that the missing package is listed in `package.json`
3. If missing, run locally:
   ```bash
   npm install missing-package-name
   git add package.json package-lock.json
   git commit -m "Add missing dependency"
   git push
   ```

#### Solution 4: Database connection error during build
**Error message contains:** `DATABASE_URL` or `database connection`

**Fix:**
This is normal! The app is configured to handle this.
1. Make sure you added the placeholder `DATABASE_URL` environment variable
2. After first deployment, add Vercel Postgres
3. Update the `DATABASE_URL` with the real value
4. Redeploy

---

## Error: "Function Execution Failed"

### Symptoms
- App loads but features don't work
- API routes return errors
- Customer save/load fails

### Solutions

#### Solution 1: Database not connected
1. Go to Vercel project → Storage tab
2. Create Vercel Postgres database (if not done)
3. Click "Connect to Project"
4. Select your project
5. Environment variables are added automatically
6. Go to Settings → Environment Variables
7. Verify `DATABASE_URL` exists
8. Redeploy

#### Solution 2: Database tables not created
1. Follow VERCEL_DEPLOYMENT_STEPS.md Part 4
2. Run the SQL commands to create tables
3. Or use Vercel CLI to run `npx drizzle-kit push`

---

## Error: "This Serverless Function has crashed"

### Symptoms
- Random crashes
- Timeout errors
- 500 Internal Server Error

### Solutions

#### Solution 1: Check function logs
1. Go to Deployments → Latest deployment
2. Click "Runtime Logs"
3. Look for actual error messages

#### Solution 2: Database timeout
**Fix:** Increase database connection pool
1. This is usually auto-configured
2. If issues persist, contact Vercel support

#### Solution 3: Out of memory
**Fix:** Optimize your code or upgrade Vercel plan
1. Free tier: 1GB memory (should be enough)
2. Check if you're loading too much data at once

---

## Error: "Environment Variable Not Found"

### Symptoms
- Error logs mention missing environment variables
- Database features don't work

### Solutions

#### Solution 1: Add environment variables
1. Go to Settings → Environment Variables
2. Click "Add New"
3. Add `DATABASE_URL` (and any others needed)
4. Click "Save"
5. Redeploy

#### Solution 2: Redeploy after adding variables
Environment variables only apply to new deployments:
1. After adding variables
2. Go to Deployments
3. Redeploy the latest

---

## Error: "CORS Error" or Logo Not Loading

### Symptoms
- Logo doesn't show on invoice
- Console shows CORS errors

### Solutions

#### Solution 1: This is expected
- The app handles this gracefully
- If logo fails to load, it just won't show
- Invoice still works perfectly

#### Solution 2: Download logo locally
1. Download logo from kenningautoglass.co.za
2. Create `public/` folder in your project
3. Save as `public/logo.png`
4. Update InvoicePreview.tsx to use `/logo.png`
5. Upload to GitHub

---

## Error: "npm ERR! code ERESOLVE"

### Symptoms
- Build fails with dependency conflict errors

### Solutions

#### Solution 1: Use legacy peer deps
Add to `package.json`:
```json
{
  "scripts": {
    "build": "npm run build --legacy-peer-deps"
  }
}
```

#### Solution 2: Update dependencies
```bash
npm update
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

---

## Error: "Route ... is not configured"

### Symptoms
- Specific pages or API routes return 404
- Routes work locally but not on Vercel

### Solutions

#### Solution 1: Check file structure
Make sure all route files are uploaded:
- `src/app/page.tsx` - Home page
- `src/app/api/customers/route.ts` - Customer API
- `src/app/api/invoices/route.ts` - Invoice API
- `src/app/api/health/route.ts` - Health check

#### Solution 2: Verify next.config.ts
Should be:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kenningautoglass.co.za',
      },
    ],
  },
};

export default nextConfig;
```

---

## Error: "Database Connection Refused"

### Symptoms
- API routes return database errors
- Customers/invoices don't save

### Solutions

#### Solution 1: Verify database is active
1. Go to Storage tab
2. Check database status (should be "Active")
3. If not active, contact Vercel support

#### Solution 2: Check connection string
1. Go to Storage → Your database
2. Copy the connection string
3. Go to Settings → Environment Variables
4. Update `DATABASE_URL` with correct string
5. Redeploy

#### Solution 3: Run database setup
Make sure you ran the SQL to create tables!
See VERCEL_DEPLOYMENT_STEPS.md Part 4

---

## General Troubleshooting Steps

### For ANY error:

1. **Read the error message carefully**
   - It usually tells you exactly what's wrong
   - Don't skip the error details!

2. **Check the deployment logs**
   - Deployments → Click failed deployment
   - Scroll to the bottom for actual error

3. **Verify files are uploaded**
   - Check your GitHub repository
   - Make sure all required files are there

4. **Test locally first**
   ```bash
   npm run build
   ```
   If this fails locally, it will fail on Vercel!

5. **Try a clean redeploy**
   - Deployments → ... → Redeploy
   - Uncheck "Use existing Build Cache"
   - This forces a fresh build

6. **Check environment variables**
   - Settings → Environment Variables
   - Make sure DATABASE_URL exists
   - Verify it's set for "Production"

---

## Still Having Issues?

### 1. Check Vercel Status
- https://www.vercel-status.com
- Maybe Vercel is having issues (rare)

### 2. Try Different Browser
- Clear cache
- Try incognito/private mode
- Try different browser entirely

### 3. Contact Vercel Support
- Go to your project → Support
- Include:
  - Error message
  - Deployment URL
  - What you've tried already

### 4. Community Help
- Vercel Discord: https://vercel.com/discord
- Next.js GitHub Discussions
- Stack Overflow (tag: vercel, nextjs)

---

## Prevention Tips

### To avoid errors in the future:

1. **Test locally before deploying**
   ```bash
   npm run build  # Must pass!
   ```

2. **Keep dependencies updated**
   ```bash
   npm update
   ```

3. **Use environment variables properly**
   - Never hardcode secrets
   - Always use .env.example template

4. **Monitor your deployments**
   - Check email notifications
   - Verify deployment succeeded

5. **Test after each deployment**
   - Visit the live URL
   - Test key features
   - Check customer creation/search

---

## Quick Reference

| Error | Most Likely Cause | Quick Fix |
|-------|------------------|-----------|
| 404 Not Found | Build incomplete or page.tsx missing | Check deployment status, verify files uploaded |
| Build Failed | TypeScript errors or missing deps | Run `npm run build` locally, fix errors |
| Database Error | DATABASE_URL not set or tables not created | Add env var, run SQL setup |
| Function Crashed | Database timeout or code error | Check logs, verify database connection |
| CORS Error | Logo loading from external site | Expected behavior, logo will fallback |

---

## Success Checklist

After fixing errors:

- [ ] Deployment shows "Ready" status
- [ ] URL loads the invoice generator
- [ ] Can search/add customers
- [ ] Can generate invoices
- [ ] PDF download works
- [ ] All features functional

✅ If all checked, your deployment is successful!
