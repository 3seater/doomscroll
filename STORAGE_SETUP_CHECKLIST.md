# ✅ Firebase Storage Setup Checklist

Since you just enabled Firebase Storage, follow these steps to make sure image uploads work:

## Step 1: Set Storage Rules (REQUIRED)

1. Go to: **https://console.firebase.google.com/project/doomscroll-1d2ce/storage/rules**
2. Replace the rules with:

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

3. Click **"Publish"**

## Step 2: Configure CORS (REQUIRED for uploads from browser)

1. Go to: **https://console.cloud.google.com/storage/browser?project=doomscroll-1d2ce**
2. Click on the bucket: **`doomscroll-1d2ce.firebasestorage.app`**
3. Click **"Configuration"** tab
4. Scroll to **"CORS"** section
5. Click **"Edit CORS configuration"**
6. Delete any existing rules
7. Paste this:

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

8. Click **"Save"**

## Step 3: Test It!

1. Wait 1-2 minutes for changes to propagate
2. Refresh your site (hard refresh: `Ctrl+Shift+R`)
3. Try uploading an image
4. Check browser console for any errors

---

## What Happens Now?

- **If Storage rules + CORS are configured:** Images upload to Firebase Storage ✅
- **If CORS is not configured:** Images fall back to base64 (still works, but less efficient) ⚠️
- **If Storage rules are wrong:** You'll get permission errors ❌

The code has a fallback, so images should work either way, but configuring both gives you the best performance!

