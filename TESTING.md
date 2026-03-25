# Testing Guide

## Prerequisites

Before testing, ensure:
1. MongoDB is running
2. .env file is configured with valid Cloudinary credentials
3. Backend server is running on port 5000
4. Frontend dev server is running on port 5173

## Step-by-Step Testing

### 1. User Registration

1. Navigate to http://localhost:5173
2. Click "Register" or "Get Started"
3. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Confirm Password: test123
4. Click "Register"
5. ✅ Should redirect to Dashboard
6. ✅ Should show welcome message with user name

### 2. User Login

1. Click "Logout"
2. Click "Login"
3. Enter credentials:
   - Email: test@example.com
   - Password: test123
4. Click "Login"
5. ✅ Should redirect to Dashboard

### 3. Create Post WITHOUT Image

1. Click "Create Post" in navbar
2. Fill in the form:
   - Title: My First Post
   - Content: This is my first post without an image.
3. Do NOT upload an image
4. Click "Create Post"
5. ✅ Should redirect to Dashboard
6. ✅ Post should appear without a cover image
7. ✅ Should show success toast

### 4. Create Post WITH Image

#### Image Upload Flow
1. Click "Create Post"
2. Fill in:
   - Title: Post with Beautiful Image
   - Content: This post has a beautiful cover image uploaded to Cloudinary.
3. Click "Choose File" under Cover Image
4. Select an image (JPG, PNG, GIF, or WEBP under 5MB)
5. ✅ Image preview should appear
6. Click "Upload to Cloudinary" button
7. ✅ Button should show "Uploading..."
8. ✅ Success message should appear: "✓ Image uploaded successfully!"
9. Fill in title and content
10. Click "Create Post"
11. ✅ Should redirect to Dashboard
12. ✅ Post should appear WITH cover image

### 5. Dashboard Verification

1. Navigate to Dashboard
2. ✅ Should see all posts in grid layout
3. ✅ Posts with images should display cover image
4. ✅ Posts without images should render cleanly
5. ✅ Should show author name
6. ✅ Should show formatted date
7. ✅ Content should be truncated to 150 characters

### 6. Upload Validation Testing

#### Test Invalid File Type
1. Go to Create Post
2. Try to upload a PDF or text file
3. ✅ Should show error: "Only image files are allowed"

#### Test Large File
1. Try to upload an image larger than 5MB
2. ✅ Should show error: "File size must be less than 5MB"

### 7. Image Remove Functionality

1. Go to Create Post
2. Upload an image
3. Click "Remove" button
4. ✅ Preview should disappear
5. ✅ File input should reset
6. ✅ Can select a different image

### 8. MongoDB Verification

```bash
# Open MongoDB shell
mongosh

# Use the database
use fullstack_assignment

# Check users
db.users.find().pretty()

# Check posts
db.posts.find().pretty()

# Verify coverImage field
db.posts.findOne({}, { coverImage: 1, title: 1 })
```

✅ Posts should have coverImage field with Cloudinary URLs like:
```
https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/post_covers/abc123.jpg
```

### 9. Cloudinary Verification

1. Log in to [Cloudinary Console](https://console.cloudinary.com/)
2. Go to Media Library
3. ✅ Should see "post_covers" folder
4. ✅ Uploaded images should be there
5. ✅ Images should show transformations (width, height, quality)

### 10. Error Handling

#### Network Error Simulation
1. Stop the backend server
2. Try to create a post
3. ✅ Should show error toast
4. ✅ Form should not reset

#### Auth Token Expiration
1. Clear localStorage in browser DevTools
2. Try to access Create Post page
3. ✅ Should redirect to Login page

### 11. Loading States

1. Create a post with an image
2. ✅ Upload button should show "Uploading..." while uploading
3. ✅ Create Post button should show "Creating Post..." while submitting
4. ✅ Dashboard should show "Loading posts..." spinner

### 12. Toast Notifications

Test that toasts appear for:
- ✅ Successful registration
- ✅ Successful login
- ✅ Failed login (wrong password)
- ✅ Successful post creation
- ✅ Failed post creation
- ✅ Image upload errors

### 13. Responsive Design

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes:
   - ✅ Mobile (375px)
   - ✅ Tablet (768px)
   - ✅ Desktop (1200px)
4. ✅ Dashboard grid should adapt
5. ✅ Navbar should work on mobile

### 14. Protected Routes

1. Log out
2. Try to access http://localhost:5173/create-post directly
3. ✅ Should redirect to login page
4. Try to access http://localhost:5173/dashboard
5. ✅ Should redirect to login page

## API Testing with Postman/Thunder Client

### Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "API Test User",
  "email": "apitest@example.com",
  "password": "test123"
}
```

### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "apitest@example.com",
  "password": "test123"
}
```

### Upload Image
```
POST http://localhost:5000/api/upload
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data

KEY: image
VALUE: [Select file]
```

### Create Post
```
POST http://localhost:5000/api/posts
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "API Test Post",
  "content": "This is a test post created via API",
  "coverImage": "https://res.cloudinary.com/..."
}
```

### Get All Posts
```
GET http://localhost:5000/api/posts
```

## Expected Results Summary

| Test | Expected Outcome |
|------|------------------|
| User Registration | Success toast, redirect to dashboard |
| User Login | Success toast, redirect to dashboard |
| Post without image | Post created, null coverImage in DB |
| Post with image | Post created, Cloudinary URL in DB |
| Image upload | Returns secure_url from Cloudinary |
| Dashboard display | Shows all posts with conditional images |
| Invalid file type | Error message displayed |
| Large file | Error message displayed |
| MongoDB check | Posts have coverImage field |
| Cloudinary check | Images in post_covers folder |
| Protected routes | Redirect to login when not authenticated |
| Loading states | Proper loading indicators |
| Error handling | User-friendly error messages |
| Responsive design | Layout adapts to screen size |

## Common Issues & Solutions

### Issue: CORS Error
**Solution**: Ensure backend has CORS enabled and frontend API URL is correct

### Issue: 401 Unauthorized
**Solution**: Check JWT token in localStorage, ensure it's being sent in headers

### Issue: Cloudinary Upload Failed
**Solution**: Verify Cloudinary credentials in .env file

### Issue: MongoDB Connection Failed
**Solution**: Ensure MongoDB is running, check MONGODB_URI

### Issue: Image Not Displaying
**Solution**: Check browser console for CORS errors, verify Cloudinary URL

### Issue: File Upload Fails
**Solution**: Check file size (<5MB), verify file type (image only)

## Performance Testing

1. Upload multiple images in sequence
2. Create 10+ posts with images
3. ✅ Dashboard should load smoothly
4. ✅ Images should lazy load
5. ✅ No memory leaks

## Security Testing

1. Try to access other user's posts API without token
2. ✅ Should return 401 Unauthorized
3. Try to upload non-image file
4. ✅ Should be rejected by multer
5. Check MongoDB for plaintext passwords
6. ✅ Passwords should be hashed

## Success Criteria

All checkboxes (✅) must be checked for complete testing coverage.

Happy Testing! 🎉
