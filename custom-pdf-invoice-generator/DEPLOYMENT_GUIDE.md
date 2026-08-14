# How to Use the Invoice Generator on Different Computers

You have several options to access your invoice generator from different computers:

## Option 1: Free Cloud Deployment (Recommended - Easy!)

Deploy your app to the cloud for FREE so you can access it from anywhere with internet.

### Using Vercel (Easiest - Recommended)

**Vercel** offers free hosting for Next.js apps and includes a PostgreSQL database!

#### Steps:

1. **Create a GitHub Account** (if you don't have one)
   - Go to https://github.com
   - Sign up for free

2. **Upload Your Code to GitHub**
   - Create a new repository
   - Upload all your invoice generator files
   - (You can use GitHub Desktop for easier uploading)

3. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Sign Up" and use your GitHub account
   - Click "Add New Project"
   - Select your invoice generator repository
   - Click "Deploy"
   - Done! You'll get a URL like: `kenning-invoices.vercel.app`

4. **Add Database**
   - In Vercel dashboard, go to your project
   - Click "Storage" tab
   - Click "Create Database" → "Postgres"
   - Follow the setup wizard (free tier available)
   - Vercel will automatically connect it!

5. **Access from Anywhere!**
   - Use your URL from any computer/phone
   - Example: `https://kenning-invoices.vercel.app`
   - Bookmark it for easy access!

**Cost:** FREE (Vercel free tier includes hosting + PostgreSQL)

---

## Option 2: Local Network Access (Your Office/Home Only)

Run the app on one computer and access it from other computers on the same network.

### Requirements:
- One computer to act as the "server" (Windows/Mac/Linux)
- All computers must be on the same WiFi/network

### Steps:

1. **On the Server Computer:**
   ```bash
   # Install Node.js from https://nodejs.org (if not installed)
   
   # Navigate to your invoice app folder
   cd path/to/invoice-generator
   
   # Install dependencies
   npm install
   
   # Start the app
   npm run dev
   ```

2. **Find Your Local IP Address:**
   
   **On Windows:**
   - Open Command Prompt
   - Type: `ipconfig`
   - Look for "IPv4 Address" (e.g., 192.168.1.100)
   
   **On Mac:**
   - Open Terminal
   - Type: `ifconfig | grep "inet "`
   - Look for IP like 192.168.1.100
   
   **On Linux:**
   - Open Terminal
   - Type: `ip addr show`
   - Look for IP like 192.168.1.100

3. **Access from Other Computers:**
   - On any computer on the same network
   - Open web browser
   - Go to: `http://YOUR-IP-ADDRESS:3000`
   - Example: `http://192.168.1.100:3000`

4. **Keep Server Running:**
   - The server computer must stay on and running the app
   - Don't close the terminal/command prompt window

**Cost:** FREE (just electricity for the server computer)

**Limitations:**
- Only works on your local network
- Can't access from outside your office/home
- Server computer must always be on

---

## Option 3: Cloud VPS (More Control)

Rent a small cloud server for full control (similar to having your own computer in the cloud).

### Providers:
- **DigitalOcean** - $4-6/month
- **Linode** - $5/month
- **Hetzner** - €4/month
- **AWS Lightsail** - $3.50/month

### General Steps:
1. Sign up with a provider
2. Create a small VPS server (Ubuntu recommended)
3. Install Node.js and PostgreSQL
4. Upload your invoice generator
5. Run it with a process manager (PM2)
6. Access via the server's IP address

**Cost:** $3-6 per month

**Pros:**
- Full control
- Access from anywhere
- Your own database

**Cons:**
- Requires some technical knowledge
- Need to manage server updates/security

---

## Option 4: Shared Hosting with Node.js Support

Some web hosts support Node.js apps.

### Providers that support Node.js:
- **A2 Hosting** - ~$10/month
- **Hostinger** - ~$8/month
- **InMotion Hosting** - ~$15/month

They often provide one-click installers and databases.

---

## Recommended Solution for You:

### **For Small Business (Recommended): Vercel**
✅ **Best for:** Easy setup, free to start, reliable
✅ **Access:** From anywhere with internet
✅ **Cost:** FREE (Vercel hobby plan)
✅ **Setup Time:** 15-30 minutes
✅ **Technical Skill:** Beginner-friendly

**Your app URL would be something like:**
- `kenning-autoglass-invoices.vercel.app`
- Or use your own domain: `invoices.kenningautoglass.co.za`

### **For Office-Only Use: Local Network**
✅ **Best for:** Only need it in one location
✅ **Access:** Only from office/home network
✅ **Cost:** FREE
✅ **Setup Time:** 10 minutes
✅ **Technical Skill:** Basic

---

## Setting Up a Custom Domain (Optional)

Once deployed to Vercel, you can use your own domain:

1. In Vercel, go to your project settings
2. Click "Domains"
3. Add: `invoices.kenningautoglass.co.za`
4. Vercel will give you DNS settings
5. Add those DNS records to your domain registrar
6. Done! Access via your own domain

---

## Quick Start - Vercel Deployment (Step-by-Step)

### 1. Prepare Your Code
```bash
# Make sure everything is ready
npm run build  # Check if it builds successfully
```

### 2. Push to GitHub
- Create account at https://github.com
- Create new repository called "kenning-invoices"
- Upload your files (can use GitHub Desktop app)

### 3. Deploy to Vercel
- Go to https://vercel.com
- Sign up with GitHub
- Click "New Project"
- Import your repository
- Vercel auto-detects Next.js
- Click "Deploy"
- Wait 2-3 minutes
- Done! ✅

### 4. Add Database
- In Vercel project, click "Storage"
- Click "Create" → "Postgres"
- Select "Free" plan
- Click "Create"
- Vercel connects it automatically

### 5. Run Database Setup
- In Vercel, go to project settings
- Add environment variables (if needed)
- Your database is ready!

### 6. Access Your App
- Vercel gives you a URL like: `kenning-invoices.vercel.app`
- Open it on any device!
- Create invoices from anywhere! 🎉

---

## Need Help?

If you need help deploying, you can:
1. Follow Vercel's video tutorials: https://vercel.com/docs
2. Check Next.js deployment docs: https://nextjs.org/docs/deployment
3. Watch YouTube: "How to deploy Next.js to Vercel"

---

## Security Tips

✅ **Don't share your admin URL publicly**
✅ **Use strong passwords** (if you add login later)
✅ **Keep environment variables secret**
✅ **Backup your database** regularly (Vercel does this automatically)

---

## Summary

| Method | Cost | Access From | Setup Difficulty | Best For |
|--------|------|-------------|-----------------|----------|
| **Vercel** | FREE | Anywhere | ⭐ Easy | Small business |
| Local Network | FREE | Same WiFi only | ⭐⭐ Medium | Office only |
| VPS | $3-6/mo | Anywhere | ⭐⭐⭐ Advanced | Custom needs |

**Recommended: Start with Vercel (free)** and you can always change later!
