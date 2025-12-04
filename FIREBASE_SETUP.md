# Firebase Setup Guide for DoomScroll

This guide will help you set up Firebase for:
- ✅ **Messages** (already implemented)
- ✅ **Comments** (already implemented)
- ❌ **Likes** (needs Firebase integration)
- ❌ **Bookmarks** (needs Firebase integration)

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select an existing project
3. Enter project name: `doomscroll` (or your preferred name)
4. Disable Google Analytics (optional) or enable if you want it
5. Click **"Create project"**

## Step 2: Enable Realtime Database

1. In your Firebase project, go to **Build** → **Realtime Database**
2. Click **"Create Database"**
3. Choose a location (select closest to your users)
4. Start in **"Test mode"** (we'll update rules later)
5. Click **"Enable"**

## Step 3: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **"Your apps"** section
3. Click the **Web icon** (`</>`) to add a web app
4. Register app with nickname: `doomscroll-web`
5. **Copy the Firebase configuration object** - it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-XXXXXXXXXX"
};
```

## Step 4: Create Environment Variables File

1. In your project root, create a file named `.env`
2. Add your Firebase config values:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important:** 
- Replace all values with your actual Firebase config
- Never commit `.env` to git (it should be in `.gitignore`)
- Restart your dev server after creating `.env`

## Step 5: Set Up Firebase Realtime Database Rules

1. Go to **Realtime Database** → **Rules** tab
2. Replace the rules with this (allows read/write for now - you can restrict later):

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

## Step 6: Enable Firebase Storage (for message images)

1. Go to **Build** → **Storage**
2. Click **"Get started"**
3. Start in **"Test mode"** (we'll update rules later)
4. Choose a location (same as database)
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

## Step 7: Test Your Setup

1. Restart your dev server: `npm run dev`
2. Open the app in browser
3. Open browser console (F12)
4. You should see: `Firebase initialized successfully`
5. Try sending a message - it should appear in Firebase Console → Realtime Database → `messages`
6. Try commenting on a video - it should appear under `comments/video_X`

## Step 8: Database Structure

Your Firebase Realtime Database will have this structure:

```
doomscroll-db
├── messages/
│   ├── -Nxxxxx1/
│   │   ├── text: "Hello!"
│   │   ├── username: "user123"
│   │   ├── timestamp: 1234567890
│   │   └── imageUrl: "https://..."
│   └── -Nxxxxx2/...
│
├── comments/
│   ├── video_1/
│   │   ├── -Nxxxxx1/
│   │   │   ├── text: "Great video!"
│   │   │   ├── username: "user123"
│   │   │   ├── timestamp: 1234567890
│   │   │   ├── likes: 5
│   │   │   ├── likedBy: ["user1", "user2"]
│   │   │   └── parentId: null (or firebaseId for replies)
│   │   └── -Nxxxxx2/...
│   └── video_2/...
│
├── videoLikes/ (to be implemented)
│   ├── video_1/
│   │   └── user123: true
│   └── video_2/...
│
├── videoBookmarks/ (to be implemented)
│   ├── video_1/
│   │   └── user123: true
│   └── video_2/...
│
└── videoStats/ (to be implemented)
    ├── video_1/
    │   ├── likes: 42
    │   └── bookmarks: 7
    └── video_2/...
```

## Next Steps (Code Implementation)

After setting up Firebase, the code needs to be updated to:
1. ✅ Messages - Already working
2. ✅ Comments - Already working  
3. ❌ **Likes** - Need to sync with Firebase
4. ❌ **Bookmarks** - Need to sync with Firebase
5. ❌ **Video Stats** - Need to sync like/bookmark counts

The developer will need to:
- Update `toggleLike()` to write to Firebase
- Update `toggleBookmark()` to write to Firebase
- Load likes/bookmarks from Firebase on app start
- Sync video stats (like/bookmark counts) with Firebase

## Security Note

The current rules allow public read/write. For production, you should:
1. Add Firebase Authentication
2. Restrict writes to authenticated users
3. Add rate limiting
4. Validate data structure

## Troubleshooting

**"Firebase not initialized" error:**
- Check that `.env` file exists in project root
- Verify all environment variables start with `VITE_`
- Restart dev server after creating/updating `.env`

**Messages/Comments not appearing:**
- Check browser console for errors
- Verify database URL in Firebase Console matches `.env`
- Check database rules allow read/write

**Storage upload fails:**
- Verify Storage is enabled in Firebase Console
- Check file size (max 5MB in rules)
- Check Storage rules allow writes

