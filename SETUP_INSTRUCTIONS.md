# Firebase Setup Instructions

## ✅ Step 1: Create `.env` File

Create a file named `.env` in your project root (same folder as `package.json`) with this content:

```env
VITE_FIREBASE_API_KEY=AIzaSyDvXrv-bSXpHA8MpHjK9XJs1_KH33LT0zA
VITE_FIREBASE_AUTH_DOMAIN=doomscroll-1d2ce.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://doomscroll-1d2ce-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=doomscroll-1d2ce
VITE_FIREBASE_STORAGE_BUCKET=doomscroll-1d2ce.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=799549418376
VITE_FIREBASE_APP_ID=1:799549418376:web:f1d7bca59b5665fcdae83d
VITE_FIREBASE_MEASUREMENT_ID=G-3493G004PD
```

**Important:** After creating `.env`, restart your dev server!

## ✅ Step 2: Enable Realtime Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **doomscroll-1d2ce**
3. Go to **Build** → **Realtime Database**
4. If not already created, click **"Create Database"**
5. Choose location (closest to your users)
6. Start in **"Test mode"** (we'll update rules next)

## ✅ Step 3: Set Database Rules

1. In Realtime Database, go to **Rules** tab
2. Replace the rules with this:

```json
{
  "rules": {
    "messages": {
      ".read": true,
      ".write": true,
      ".indexOn": ["timestamp"]
    },
    "comments": {
      ".read": true,
      ".write": true,
      "$videoId": {
        ".indexOn": ["timestamp"]
      }
    },
    "videoLikes": {
      ".read": true,
      ".write": true,
      "$videoId": {
        ".read": true,
        ".write": true
      }
    },
    "videoBookmarks": {
      ".read": true,
      ".write": true,
      "$videoId": {
        ".read": true,
        ".write": true
      }
    },
    "videoStats": {
      ".read": true,
      ".write": true,
      "$videoId": {
        ".read": true,
        ".write": true,
        "likes": {
          ".validate": "newData.isNumber()"
        },
        "bookmarks": {
          ".validate": "newData.isNumber()"
        }
      }
    }
  }
}
```

3. Click **"Publish"**

## ✅ Step 4: Enable Storage (for message images)

1. Go to **Build** → **Storage**
2. If not enabled, click **"Get started"**
3. Start in **"Test mode"**
4. Choose location (same as database)
5. Click **"Done"**

### Storage Rules

1. Go to **Storage** → **Rules** tab
2. Replace with:

```json
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /messages/{messageId}/{fileName} {
      allow read: if true;
      allow write: if request.resource.size < 5 * 1024 * 1024; // 5MB max
    }
  }
}
```

3. Click **"Publish"**

## ✅ Step 5: Test It!

1. Restart your dev server: `npm run dev`
2. Open browser console (F12)
3. You should see: `Firebase initialized successfully`
4. Set a username when prompted
5. Try:
   - **Liking a video** - should sync to Firebase
   - **Bookmarking a video** - should sync to Firebase
   - **Sending a message** - should appear in Firebase
   - **Commenting on a video** - should appear in Firebase

## 🎉 Done!

Everything is now connected to Firebase:
- ✅ Messages sync in real-time
- ✅ Comments sync in real-time
- ✅ Likes sync in real-time (NEW!)
- ✅ Bookmarks sync in real-time (NEW!)
- ✅ Video stats (like/bookmark counts) update in real-time (NEW!)

## Database Structure

Your Firebase will have this structure:

```
doomscroll-1d2ce-db
├── messages/
│   └── [messageId]/
│       ├── text
│       ├── username
│       ├── timestamp
│       └── imageUrl (optional)
│
├── comments/
│   └── video_[videoId]/
│       └── [commentId]/
│           ├── text
│           ├── username
│           ├── timestamp
│           ├── likes
│           ├── likedBy
│           └── parentId (for replies)
│
├── videoLikes/
│   └── video_[videoId]/
│       └── [username]: true
│
├── videoBookmarks/
│   └── video_[videoId]/
│       └── [username]: true
│
└── videoStats/
    └── video_[videoId]/
        ├── likes: 42
        └── bookmarks: 7
```

## Troubleshooting

**"Firebase not initialized" error:**
- Make sure `.env` file exists in project root
- Restart dev server after creating `.env`
- Check browser console for errors

**Likes/Bookmarks not saving:**
- Make sure username is set
- Check database rules allow write
- Check browser console for errors

**Counts not updating:**
- Check `videoStats` in Firebase Console
- Make sure database rules allow read/write on `videoStats`

