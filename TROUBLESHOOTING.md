# Troubleshooting Firebase Issues

If likes, bookmarks, comments, or messages aren't working, follow these steps:

## Step 1: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Look for error messages

### Common Errors:

**"Firebase not initialized"**
- **Solution**: Create `.env` file in project root with your Firebase credentials
- See `SETUP_INSTRUCTIONS.md` for the exact format

**"Missing Firebase environment variables"**
- **Solution**: Check that all variables in `.env` start with `VITE_`
- Restart dev server after creating/updating `.env`

**"Permission denied" or "PERMISSION_DENIED"**
- **Solution**: Check Firebase Database Rules (see Step 2)

**"Please set a username first"**
- **Solution**: Set a username when the modal appears, or check localStorage

## Step 2: Verify Firebase Database Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **doomscroll-1d2ce**
3. Go to **Realtime Database** → **Rules**
4. Make sure rules allow read/write (see `SETUP_INSTRUCTIONS.md`)

## Step 3: Check Username

1. Open browser console (F12)
2. Type: `localStorage.getItem('genuinely_username')`
3. If it returns `null`, you need to set a username
4. The username modal should appear on first load

## Step 4: Verify .env File

1. Check that `.env` file exists in project root (same folder as `package.json`)
2. Verify all variables are present:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_DATABASE_URL=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   VITE_FIREBASE_MEASUREMENT_ID=...
   ```
3. **Restart dev server** after creating/updating `.env`

## Step 5: Test Each Feature

### Test Messages:
1. Open Messages app
2. Type a message and send
3. Check console for errors
4. Check Firebase Console → Realtime Database → `messages` to see if it appears

### Test Comments:
1. Click comment icon on a video
2. Type a comment and post
3. Check console for errors
4. Check Firebase Console → Realtime Database → `comments/video_X` to see if it appears

### Test Likes:
1. Click like button on a video
2. Check console for errors
3. Check Firebase Console → Realtime Database → `videoLikes/video_X` to see if your username appears

### Test Bookmarks:
1. Click bookmark button on a video
2. Check console for errors
3. Check Firebase Console → Realtime Database → `videoBookmarks/video_X` to see if your username appears

## Step 6: Network Issues

If you see network errors:
1. Check your internet connection
2. Check if Firebase is accessible: https://console.firebase.google.com/
3. Check browser console for CORS errors
4. Try in incognito/private mode (to rule out extensions)

## Quick Fix Checklist

- [ ] `.env` file exists in project root
- [ ] All `VITE_FIREBASE_*` variables are set
- [ ] Dev server restarted after creating `.env`
- [ ] Username is set (check localStorage)
- [ ] Firebase Database Rules allow read/write
- [ ] No errors in browser console
- [ ] Internet connection is working

## Still Not Working?

1. **Check Firebase Console** → Realtime Database → Data tab
   - Do you see any data being written?
   - Are there any error messages?

2. **Check Network Tab** in browser DevTools
   - Look for failed requests to `firebaseio.com`
   - Check status codes (should be 200)

3. **Try clearing browser cache** and localStorage:
   ```javascript
   localStorage.clear()
   location.reload()
   ```

4. **Verify Firebase project is active**:
   - Go to Firebase Console
   - Make sure project isn't paused or deleted

## Common Solutions

**Problem**: Nothing works, no errors in console
- **Solution**: Firebase not initialized - create `.env` file

**Problem**: "Permission denied" errors
- **Solution**: Update Firebase Database Rules to allow read/write

**Problem**: Username modal keeps appearing
- **Solution**: Check localStorage - username might not be saving

**Problem**: Works locally but not on Netlify
- **Solution**: Add environment variables in Netlify dashboard (Site settings → Environment variables)

