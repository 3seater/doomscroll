# Quick Fix: Enable Image Uploads (CORS Configuration)

The image upload is failing because Firebase Storage needs CORS configured for your domain. Here's the **fastest way to fix it**:

## Method 1: Google Cloud Console (Easiest - 2 minutes)

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/storage/browser?project=doomscroll-1d2ce
   - Or go to: https://console.cloud.google.com/ → Select project "doomscroll-1d2ce"

2. **Open your Storage Bucket:**
   - Click on **Cloud Storage** → **Buckets** (in left sidebar)
   - Click on the bucket: `doomscroll-1d2ce.firebasestorage.app`

3. **Configure CORS:**
   - Click the **Configuration** tab
   - Scroll down to **CORS** section
   - Click **Edit CORS configuration**
   - **Delete any existing CORS rules**
   - Paste this JSON:

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

   - Click **Save**

4. **Wait 1-2 minutes** for changes to propagate

5. **Refresh your site** and try uploading an image again

---

## Method 2: Using gsutil (If you have Google Cloud SDK)

If you have `gsutil` installed, run this command:

```bash
gsutil cors set cors.json gs://doomscroll-1d2ce.firebasestorage.app
```

The `cors.json` file is already in your project root.

---

## Method 3: Firebase Console (Alternative)

1. Go to: https://console.firebase.google.com/project/doomscroll-1d2ce/storage
2. Click on **Rules** tab
3. Make sure your Storage rules are:

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

4. Then configure CORS in Google Cloud Console (Method 1 above)

---

## Verify It's Working

After configuring CORS:
1. Wait 1-2 minutes
2. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Try uploading an image
4. Check browser console - CORS errors should be gone

---

## Still Not Working?

If it still doesn't work after 2-3 minutes:
- Make sure you saved the CORS configuration
- Check that the bucket name is exactly: `doomscroll-1d2ce.firebasestorage.app`
- Try using `["*"]` as origin (allows all domains) for testing
- Check browser console for any new error messages

