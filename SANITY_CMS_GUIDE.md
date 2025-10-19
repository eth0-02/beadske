# 🎯 Sanity CMS Integration Guide

## ✅ Current Setup Status

### What's Working:
- ✅ **Sanity Studio:** Deployed at https://beads.sanity.studio
- ✅ **Website:** Deployed at https://ubiquitous-begonia-1bc64e.netlify.app
- ✅ **Connection:** Sanity API is connected and working
- ✅ **Project ID:** wrmf59p3
- ✅ **Dataset:** production

### The Issue:
Your website is a **Single Page Application (SPA)** that fetches data from Sanity when the page loads in the browser. When you publish changes in Sanity, the website doesn't automatically rebuild - it just fetches fresh data on the next page load.

However, **browser caching** and **Netlify CDN caching** can prevent you from seeing changes immediately.

---

## 🔧 How to See Changes After Publishing in Sanity

### Option 1: Hard Refresh (Quickest)
After publishing in Sanity:
1. Go to your website
2. **Hard refresh:** `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
3. Changes should appear

### Option 2: Clear Cache and Redeploy (Most Reliable)
1. Go to **Netlify Dashboard** → **Deploys**
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait 1-2 minutes for build to complete
4. Refresh your website

### Option 3: Set Up Automatic Webhook (Best Long-term Solution)

#### Step 1: Create Netlify Build Hook
1. **Netlify** → Your site → **Site configuration** → **Build & deploy**
2. Scroll to **Build hooks** → **Add build hook**
3. Name: `Sanity Content Update`
4. Branch: `main`
5. **Copy the webhook URL**

#### Step 2: Add Webhook to Sanity
1. Go to https://www.sanity.io/manage
2. Select project **wrmf59p3**
3. **API** → **Webhooks** → **Create webhook**
4. Fill in:
   - Name: `Netlify Auto Deploy`
   - URL: (paste Netlify build hook URL)
   - Dataset: `production`
   - Trigger on: `Create`, `Update`, `Delete`
5. **Save**

Now when you publish in Sanity, Netlify will automatically rebuild in 2-3 minutes!

---

## 📝 How to Edit Content in Sanity

### Edit Existing Product:
1. Go to https://beads.sanity.studio
2. Click **Product** in sidebar
3. Select the product you want to edit
4. Make your changes
5. **Click PUBLISH** (not just save as draft!)
6. Wait 2-3 minutes (if webhook is set up) OR hard refresh website

### Create New Product:
1. Go to https://beads.sanity.studio
2. Click **Product** → **Create**
3. Fill in all fields:
   - Title
   - Slug (click "Generate" button)
   - Price
   - Description
   - Images (upload at least one)
   - Category
   - Inventory
4. **Click PUBLISH**
5. Product appears on website immediately (after hard refresh)

### Important Notes:
- ⚠️ **DRAFT content is NOT visible on the website**
- ✅ Only **PUBLISHED content** appears on the website
- 🔄 Changes appear immediately when you hard refresh
- ⏰ With webhook: Changes appear automatically in 2-3 minutes

---

## 🧪 Test the Connection

### Test 1: Check if Sanity API is responding
Open browser console (F12) and run:
```javascript
fetch('https://wrmf59p3.api.sanity.io/v2024-01-01/data/query/production?query=*[_type=="product"][0]{title,price}')
  .then(r => r.json())
  .then(d => console.log(d))
```

You should see a product with its title and price.

### Test 2: Verify Environment Variables
Check Netlify has these variables:
- `VITE_SANITY_PROJECT_ID=wrmf59p3`
- `VITE_SANITY_DATASET=production`
- `VITE_SANITY_API_VERSION=2024-01-01`
- `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...`
- `VITE_PAYMENT_SERVER_URL=https://maasai-payment-server-production.up.railway.app`

---

## 🚀 Quick Troubleshooting

### Changes not appearing?
1. ✅ Did you click **PUBLISH** (not just save)?
2. ✅ Did you hard refresh (`Ctrl + Shift + R`)?
3. ✅ Try clearing browser cache completely
4. ✅ Try in incognito/private window
5. ✅ Trigger a new deploy in Netlify with cache clear

### Product not showing on website?
1. ✅ Check it's **PUBLISHED** (not draft)
2. ✅ Check it has all required fields (title, slug, price, images)
3. ✅ Check the slug is unique
4. ✅ Hard refresh the website

### Images not loading?
1. ✅ Make sure images are uploaded in Sanity
2. ✅ Check image URLs in browser console
3. ✅ Verify Sanity project ID is correct in environment variables

---

## 📊 Summary

**Your setup is working correctly!** The "issue" is just how SPAs work:
- Data is fetched when the page loads
- Browser/CDN caching can delay seeing changes
- Solution: Hard refresh or set up webhook for automatic rebuilds

**No need to redeploy Sanity Studio** - it's already live and working at https://beads.sanity.studio

**Everything is connected properly** - just remember to:
1. **PUBLISH** (not draft)
2. **Hard refresh** to see changes
3. Or set up webhook for automatic updates

---

Made with ❤️ for Beadske E-Commerce Platform
