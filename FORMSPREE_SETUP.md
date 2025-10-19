# 📧 Formspree Setup Guide

## ✅ Custom Design Form Now Uses Formspree!

The custom design form has been updated to submit to Formspree instead of just Sanity. This means you'll receive email notifications for every custom order request!

---

## 🚀 Setup Steps (5 minutes):

### Step 1: Create Formspree Account
1. Go to: **https://formspree.io/**
2. Click **"Sign Up"** (it's free!)
3. Sign up with your email

### Step 2: Create a New Form
1. After logging in, click **"+ New Form"**
2. Name it: **"Custom Design Requests"**
3. Click **"Create Form"**

### Step 3: Get Your Form ID
1. You'll see a form ID like: `xyzabc123`
2. **Copy this ID!**

### Step 4: Add to Environment Variables

#### For Netlify:
1. Go to **Netlify Dashboard**
2. Your site → **Site configuration** → **Environment variables**
3. Click **"Add a variable"**
4. Key: `VITE_FORMSPREE_FORM_ID`
5. Value: `xyzabc123` (your form ID)
6. Click **"Create variable"**

#### Update .env.netlify file:
Replace `YOUR_FORM_ID` with your actual form ID:
```env
VITE_FORMSPREE_FORM_ID=xyzabc123
```

### Step 5: Deploy
1. Go to **Netlify** → **Deploys**
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait 2 minutes

### Step 6: Test It!
1. Go to: `https://ubiquitous-begonia-1bc64e.netlify.app/custom-design`
2. Fill out the form
3. Submit
4. **Check your email!** You'll receive the custom order details

---

## 📧 What You'll Receive:

Every time someone submits a custom design request, you'll get an email with:
- ✅ Customer name
- ✅ Email address
- ✅ Phone number
- ✅ Design type (bracelet, necklace, etc.)
- ✅ Preferred colors
- ✅ Size/measurements
- ✅ Description
- ✅ Budget range
- ✅ Deadline
- ✅ Reference images (if uploaded)

---

## 🔧 Formspree Features:

### Free Plan Includes:
- ✅ 50 submissions per month
- ✅ Email notifications
- ✅ File uploads
- ✅ Spam filtering
- ✅ Export submissions

### Upgrade for More:
- Unlimited submissions
- Custom email templates
- Webhooks
- Integrations (Slack, Google Sheets, etc.)

---

## 💾 Backup to Sanity:

The form ALSO saves to Sanity CMS as a backup! So you can:
1. View all requests in Sanity Studio
2. Track status (new, reviewing, quoted, etc.)
3. Add admin notes
4. Keep organized records

**Best of both worlds!**

---

## 🧪 Testing:

### Test Locally:
```bash
npm run dev
```
Go to: `http://localhost:5173/custom-design`

### Test on Live Site:
Go to: `https://ubiquitous-begonia-1bc64e.netlify.app/custom-design`

Fill out the form and submit. You should:
1. ✅ See success message
2. ✅ Receive email from Formspree
3. ✅ See request in Sanity Studio

---

## 🎯 Complete Environment Variables:

Make sure ALL of these are in Netlify:

```env
VITE_SANITY_PROJECT_ID=wrmf59p3
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_TOKEN=skVGeIhFDEsy3bIKk8zu4xyKjS0UaxW4zFsjhzL4fxCAoWPFc4fD01Kvm7nTXsIQYXlZURJheWI8h0UqddGHkc77IVg5PruDoL5VgtoOBNBnUCMPcH141k9lpx2fPy0wEUcv2h19jj4ry2YzAILpFLwQUAvAv8Oq2yiSEelKzX5gv0v5LJN0
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51SG1KfEaB1foGUZCJIXLa8ELPxIx8E1bvDYfL1hQNwpgjVLspHnR6j9U1xQbBnRc5lh11mgdqtQtmDuHeQAtzqWQ0MeNeu7IqZX
VITE_PAYMENT_SERVER_URL=https://maasai-payment-server-production.up.railway.app
VITE_FORMSPREE_FORM_ID=xyzabc123
```

---

## ✅ Benefits of Formspree:

1. **Email Notifications** - Get instant alerts
2. **No Backend Needed** - Works with static sites
3. **File Uploads** - Customers can attach images
4. **Spam Protection** - Built-in spam filtering
5. **Easy Setup** - 5 minutes to configure
6. **Free Tier** - Perfect for small businesses

---

Made with ❤️ for Beadske E-Commerce Platform
