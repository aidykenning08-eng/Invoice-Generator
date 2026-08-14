# How to Change/Update Your Logo

This guide shows you how to replace the logo in your invoice generator with your own custom logo.

---

## 🎨 Current Logo Setup

**Your app is already configured to use a local logo!** ✅

- **Location:** `public/logo.webp`
- **No code changes needed** - just add your logo file
- **Format:** WebP (recommended) or PNG

**Benefits:**
- ✅ Works offline
- ✅ No CORS issues
- ✅ Faster loading
- ✅ More reliable
- ✅ Always available
- ✅ No external dependencies

---

## 📋 Before You Start

### What You Need:
- [ ] Your logo file (PNG, JPG, or SVG)
- [ ] Logo should be:
  - **Format:** PNG recommended (transparent background)
  - **Size:** 400-800px wide
  - **Aspect ratio:** Horizontal/landscape works best
  - **File size:** Under 500KB recommended

### Recommended Logo Specs:
- **Width:** 400-600px
- **Height:** 80-150px
- **Format:** PNG with transparent background
- **File size:** 50-200KB
- **Color:** Your brand colors

---

## 🚀 Method 1: Using Your Own Logo File (Recommended)

### Step 1: Prepare Your Logo

1. **Find/create your logo file**
   - Use your existing logo
   - Or create one at Canva, Figma, etc.

2. **Optimize the logo (optional but recommended)**
   - Go to https://tinypng.com
   - Upload your logo
   - Download the compressed version
   - Or use any image optimizer

3. **Rename the file**
   - Rename it to: `logo.webp`
   - Exactly this name (lowercase)
   - No spaces, no capitals

### Step 2: Add Logo to Your Project

1. **The public folder already exists!** ✅
   ```
   your-project/
   └── public/          ← Already created
       └── logo.webp    ← Put your logo here
   ```

2. **Copy your logo file**
   - Place `logo.webp` in the `public/` folder
   - Delete the placeholder files (PLACE_YOUR_LOGO_HERE.txt, logo.webp.txt)
   - That's it! Next.js automatically serves files from `public/`

### Step 3: Code Already Updated! ✅

**Good news:** The code is already configured to use `/logo.webp`!

**You don't need to change any code.** Just add your logo file and it works!

~~You need to update the logo URL in **3 files**:~~ (Not needed anymore!)

#### File 1: `src/app/page.tsx`

**Find this (around line 25-28):**
```tsx
<img 
  src="https://kenningautoglass.co.za/logo.png" 
  alt="Kenning AutoGlass Logo" 
  className="h-20 w-auto"
/>
```

**Replace with:**
```tsx
<img 
  src="/logo.png" 
  alt="Kenning AutoGlass Logo" 
  className="h-20 w-auto"
/>
```

#### File 2: `src/components/InvoicePreview.tsx`

**Find this (around line 128-134):**
```tsx
<img 
  src="https://kenningautoglass.co.za/logo.png" 
  alt="Kenning AutoGlass Logo" 
  className="h-16 w-auto"
  crossOrigin="anonymous"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  }}
/>
```

**Replace with:**
```tsx
<img 
  src="/logo.png" 
  alt="Kenning AutoGlass Logo" 
  className="h-16 w-auto"
/>
```

### Step 4: Remove next.config.ts Image Configuration (Optional)

Since you're using a local logo, you don't need the external image configuration.

**Open:** `next.config.ts`

**Find and remove this section:**
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'kenningautoglass.co.za',
    },
  ],
},
```

**Your next.config.ts should look like:**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

### Step 5: Test Locally

```bash
npm run dev
```

Open http://localhost:3000 and check:
- [ ] Logo appears on main page
- [ ] Logo appears on invoice preview
- [ ] Logo appears in downloaded PDF
- [ ] No errors in browser console

### Step 6: Upload to GitHub/Vercel

If you're deploying to Vercel:

1. **Add the logo to GitHub:**
   - Upload the `public/` folder with your `logo.png`
   - Commit the code changes to the 3 files above

2. **Push to GitHub:**
   ```bash
   git add public/logo.png
   git add src/app/page.tsx
   git add src/components/InvoicePreview.tsx
   git add next.config.ts
   git commit -m "Use local logo instead of external"
   git push
   ```

3. **Vercel auto-deploys:**
   - Vercel will automatically detect the changes
   - Redeploy with your new logo
   - Done! ✅

---

## 🎨 Method 2: Using a Different Format (SVG)

SVG logos are great because they scale perfectly at any size.

### Step 1: Get SVG Logo

1. Export your logo as SVG
2. Rename to `logo.svg`
3. Place in `public/` folder

### Step 2: Update Code (Same as Method 1)

Change the file extension from `.png` to `.svg`:

```tsx
<img 
  src="/logo.svg" 
  alt="Kenning AutoGlass Logo" 
  className="h-20 w-auto"
/>
```

---

## 🖼️ Method 3: Using Next.js Image Component (Advanced)

For better performance, use Next.js Image component:

### Update `src/app/page.tsx`

**Replace the img tag with:**
```tsx
import Image from 'next/image';

// Then in your component:
<Image 
  src="/logo.png" 
  alt="Kenning AutoGlass Logo" 
  width={200}
  height={60}
  priority
/>
```

### Update `src/components/InvoicePreview.tsx`

**Same replacement:**
```tsx
import Image from 'next/image';

// In the component:
<Image 
  src="/logo.png" 
  alt="Kenning AutoGlass Logo" 
  width={160}
  height={50}
  priority
/>
```

**Note:** You'll need to specify width and height that match your logo's aspect ratio.

---

## 🎯 Adjusting Logo Size

### On Main Page (Larger)

In `src/app/page.tsx`, change the className:

```tsx
className="h-20 w-auto"  // Current (80px tall)
className="h-24 w-auto"  // Larger (96px tall)
className="h-16 w-auto"  // Smaller (64px tall)
```

### On Invoice (Smaller)

In `src/components/InvoicePreview.tsx`, change the className:

```tsx
className="h-16 w-auto"  // Current (64px tall)
className="h-20 w-auto"  // Larger (80px tall)
className="h-12 w-auto"  // Smaller (48px tall)
```

---

## 🎨 Logo Design Tips

### Best Practices:

1. **Format:**
   - PNG with transparent background (best)
   - SVG for perfect scaling
   - JPG only if you have a background color

2. **Size:**
   - Width: 400-600px
   - Height: 80-150px
   - File size: Under 200KB

3. **Colors:**
   - Use your brand colors
   - Make sure it's readable on white background
   - Consider a version with your company name

4. **Style:**
   - Horizontal/landscape orientation works best
   - Keep it simple and professional
   - Avoid very thin lines (they may not show well in PDF)

### Free Logo Tools:

- **Canva:** https://canva.com (free logo maker)
- **LogoMakr:** https://logomakr.com
- **Figma:** https://figma.com (for custom designs)
- **Remove.bg:** https://remove.bg (remove background from existing logo)

---

## 📁 File Structure After Adding Logo

```
your-project/
├── public/
│   └── logo.png          ← Your logo here
├── src/
│   ├── app/
│   │   └── page.tsx      ← Updated
│   └── components/
│       └── InvoicePreview.tsx  ← Updated
├── next.config.ts        ← Updated (optional)
└── [other files...]
```

---

## ✅ Checklist

After changing the logo:

- [ ] Logo file in `public/` folder
- [ ] Updated `src/app/page.tsx`
- [ ] Updated `src/components/InvoicePreview.tsx`
- [ ] Removed external image config from `next.config.ts` (optional)
- [ ] Tested locally (`npm run dev`)
- [ ] Logo shows on main page
- [ ] Logo shows on invoice
- [ ] Logo shows in PDF download
- [ ] Committed to GitHub
- [ ] Deployed to Vercel (if applicable)

---

## 🆘 Troubleshooting

### Logo Not Showing

**Problem:** I added the logo but it's not showing

**Solutions:**

1. **Check file location:**
   - Logo must be in `public/` folder
   - Not in `src/` or anywhere else

2. **Check file name:**
   - Make sure it matches what you put in the code
   - Case-sensitive! `Logo.png` ≠ `logo.png`

3. **Restart dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev  # Start again
   ```

4. **Clear browser cache:**
   - Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Logo Shows Locally But Not on Vercel

**Problem:** Works locally but not after deployment

**Solutions:**

1. **Make sure you uploaded the file to GitHub:**
   ```bash
   git add public/logo.png
   git commit -m "Add logo"
   git push
   ```

2. **Check GitHub:**
   - Go to your repository
   - Verify `public/logo.png` is there

3. **Trigger redeploy on Vercel:**
   - Vercel → Deployments → Redeploy

### Logo Too Big/Small

**Problem:** Logo doesn't look right

**Solutions:**

1. **Change the height class:**
   ```tsx
   // Try different sizes:
   className="h-12 w-auto"  // Small
   className="h-16 w-auto"  // Medium
   className="h-20 w-auto"  // Large
   className="h-24 w-auto"  // Extra Large
   ```

2. **Or use specific width:**
   ```tsx
   className="w-48 h-auto"  // 192px wide
   ```

### Logo Quality Poor in PDF

**Problem:** Logo looks blurry in PDF

**Solutions:**

1. **Use higher resolution logo:**
   - At least 400px wide
   - PNG format preferred

2. **Use SVG format:**
   - SVG scales perfectly at any size
   - No quality loss

3. **Use the Print/Save as PDF method:**
   - This often gives better quality than the download button

---

## 🔄 Updating Your Logo Later

To change your logo in the future:

1. **Replace the file:**
   - Delete old `public/logo.png`
   - Add new `public/logo.png`

2. **Same filename = no code changes needed!**
   - If you keep the same filename, everything just works

3. **Different filename:**
   - Update the 2 files mentioned above
   - Change `/logo.png` to `/your-new-logo.png`

---

## 💡 Pro Tips

### Tip 1: Keep a Backup
- Save your original logo file somewhere safe
- You might need to re-export it later

### Tip 2: Optimize File Size
- Smaller files = faster loading
- Use https://tinypng.com to compress
- Aim for under 100KB if possible

### Tip 3: Test the PDF
- Always test the PDF download after changing logo
- Make sure it appears correctly
- Try all 3 PDF methods (Print, Download, Save & Download)

### Tip 4: Version Your Logos
- Keep different sizes: `logo-large.png`, `logo-small.png`
- Use the appropriate size for each location
- Better performance and visual quality

### Tip 5: Brand Consistency
- Use the same logo across all materials
- Match colors with your other branding
- Consider creating an invoice-specific version

---

## 📱 Logo Sizes Reference

### Recommended Sizes for Different Uses:

| Location | Recommended | Class | Actual Size |
|----------|-------------|-------|-------------|
| Main page header | 400x80px | `h-20` | 80px tall |
| Invoice header | 320x64px | `h-16` | 64px tall |
| PDF invoice | 320x64px | `h-16` | 64px tall |
| Favicon (optional) | 32x32px | N/A | Browser tab icon |

---

## 🎨 Example: Complete Logo Change

Here's what changing the logo looks like step-by-step:

### Before:
```
Logo from: https://kenningautoglass.co.za/logo.png
Issues: External, CORS, internet required
```

### After:
```
Logo from: /logo.png (local file)
Benefits: Fast, reliable, works offline
```

### Files Changed:
```
1. Added: public/logo.png
2. Updated: src/app/page.tsx (line ~26)
3. Updated: src/components/InvoicePreview.tsx (line ~130)
4. Updated: next.config.ts (removed image config)
```

### Result:
✅ Logo loads faster
✅ No CORS issues
✅ Works in all PDFs
✅ Fully under your control

---

## 📖 Summary

**Quick Steps:**
1. Put `logo.png` in `public/` folder
2. Change `src="https://..."` to `src="/logo.png"` in 2 files
3. Test locally
4. Upload to GitHub
5. Done! ✅

**Benefits:**
- ✅ Faster loading
- ✅ More reliable
- ✅ No CORS issues
- ✅ Works offline
- ✅ Better PDF quality

**Files to Update:**
- `public/logo.png` (add your logo)
- `src/app/page.tsx` (update URL)
- `src/components/InvoicePreview.tsx` (update URL)
- `next.config.ts` (optional - remove external config)

---

## Need Help?

If you're stuck:
1. Check the file is in `public/` folder
2. Make sure filename matches exactly
3. Restart dev server
4. Clear browser cache
5. Check browser console for errors

Your logo change is complete! 🎉
