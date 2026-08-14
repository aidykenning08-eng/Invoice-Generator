# Quick Logo Change - 5 Minute Guide

## 🎨 Fast Way to Change Your Logo

### Step 1: Add Your Logo (1 min)

1. The `public/` folder already exists ✅
2. Put your logo file there
3. Name it: `logo.webp`

```
your-project/
└── public/
    └── logo.webp  ← Your logo here
```

**Note:** WebP format is recommended, but PNG also works (just rename to logo.webp)

---

### Step 2: No Code Changes Needed! ✅

**The code is already updated to use `/logo.webp`!**

Just add your `logo.webp` file to the `public/` folder and it will work automatically.

No need to edit any code files! 🎉

---

### Step 3: Test (1 min)

```bash
npm run dev
```

Open http://localhost:3000 and check if logo shows.

---

### Step 2: Deploy (1 min)

If using Vercel:

```bash
git add public/logo.webp
git commit -m "Add company logo"
git push
```

Vercel auto-deploys! ✅

---

## ✅ Done!

**Total time:** 2 minutes (even faster now!)
**Result:** Your logo on all invoices and pages  
**Code changes needed:** ZERO! Just add the file ✅  

---

## 📖 Need More Details?

See **HOW_TO_CHANGE_LOGO.md** for:
- Logo optimization tips
- Different file formats (SVG, JPG)
- Size adjustments
- Troubleshooting
- Advanced options

---

## 🎯 Logo Requirements

- **Format:** WebP (recommended) or PNG
- **Size:** 400-600px wide
- **Background:** Transparent preferred
- **File size:** Under 200KB
- **Name:** `logo.webp` (exactly this)
- **Location:** `public/` folder (already exists)

---

## 🆘 Quick Troubleshooting

**Logo not showing?**
1. Check file is named exactly `logo.webp` (lowercase)
2. Check file is in `public/` folder
3. Restart dev server (`Ctrl+C` then `npm run dev`)
4. Clear browser cache (`Ctrl+Shift+R`)

**Converting to WebP:**
- Online: https://cloudconvert.com/png-to-webp
- Or just rename your PNG to logo.webp (works fine!)

**Still not working?**
- See HOW_TO_CHANGE_LOGO.md for detailed help
