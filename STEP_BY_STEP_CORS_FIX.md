# 🔴 CRITICAL: Fix Image Uploads - Step by Step

**The CORS error means Firebase Storage is blocking uploads from your domain. You MUST configure this in Google Cloud Console.**

## ⚡ Quick Fix (5 minutes)

### Step 1: Open Google Cloud Console
1. Go to: **https://console.cloud.google.com/**
2. If prompted, sign in with your Google account
3. **Select the project:** `doomscroll-1d2ce`
   - If you don't see it, click the project dropdown at the top and search for "doomscroll"

### Step 2: Navigate to Storage
1. In the left sidebar, click **"Cloud Storage"** (under "Storage")
2. If you don't see it, click the **☰ menu** (hamburger icon) at the top left
3. Look for **"Storage"** → **"Buckets"**

### Step 3: Open Your Bucket
1. You should see a bucket named: **`doomscroll-1d2ce.firebasestorage.app`**
2. **Click on it** to open it

### Step 4: Configure CORS
1. Click the **"Configuration"** tab at the top
2. Scroll down to find the **"CORS"** section
3. Click **"Edit CORS configuration"** button
4. **Delete ALL existing CORS rules** (if any)
5. **Paste this EXACT JSON:**

```json
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
    "responseHeader": ["Content-Type", "Authorization", "x-goog-resumable"],
    "maxAgeSeconds": 3600
  }
]
```

6. Click **"Save"** button

### Step 5: Wait and Test
1. **Wait 2-3 minutes** for changes to propagate
2. Go back to your site: **https://doomscroll.now**
3. **Hard refresh** your browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. Try uploading an image again

---

## 🆘 Still Not Working?

### Check These Things:

1. **Did you save the CORS configuration?**
   - Go back to Storage → Buckets → Your bucket → Configuration tab
   - Check if the CORS rule is there

2. **Is the bucket name correct?**
   - Should be: `doomscroll-1d2ce.firebasestorage.app`
   - Check in Firebase Console: https://console.firebase.google.com/project/doomscroll-1d2ce/storage

3. **Wait longer**
   - Sometimes it takes 5-10 minutes for CORS to propagate
   - Try again after waiting

4. **Check Storage Rules**
   - Go to: https://console.firebase.google.com/project/doomscroll-1d2ce/storage/rules
   - Make sure rules allow write access:
   ```json
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /chat-images/{allPaths=**} {
         allow read: if true;
         allow write: if true;
       }
     }
   }
   ```

---

## 📸 Screenshot Guide

**Where to find CORS:**
1. Google Cloud Console → Cloud Storage → Buckets
2. Click your bucket → Configuration tab
3. Scroll to "CORS" section
4. Click "Edit CORS configuration"

---

## 🔄 Alternative: Use Command Line

If you have `gsutil` installed:

```bash
gsutil cors set cors.json gs://doomscroll-1d2ce.firebasestorage.app
```

The `cors.json` file is in your project root.

---

**This is the ONLY way to fix it. The code is correct - CORS must be configured server-side in Google Cloud Console.**

