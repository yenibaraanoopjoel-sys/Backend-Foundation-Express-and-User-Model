# Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Clone/Navigate to project
cd fullsatck_assignment

# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..

# Start backend (Terminal 1)
npm run dev

# Start frontend (Terminal 2)
cd client && npm run dev

# Access application
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```

## 📁 Important File Locations

### Backend Core Files
- `server.js` - Main Express server
- `models/Post.js` - Post schema with coverImage field
- `controllers/uploadController.js` - Image upload logic
- `controllers/postController.js` - Post CRUD operations
- `middleware/upload.js` - Multer configuration
- `config/cloudinary.js` - Cloudinary setup

### Frontend Core Files
- `client/src/App.jsx` - Main app component
- `client/src/components/ImageUpload.jsx` - Image upload component
- `client/src/pages/CreatePost.jsx` - Post creation page
- `client/src/pages/Dashboard.jsx` - Dashboard display
- `client/src/utils/api.js` - Axios configuration

### Configuration Files
- `.env` - Environment variables (create from .env.example)
- `client/.env` - Frontend environment variables

## 🔑 Environment Variables

```env
# Backend (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fullstack_assignment
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development

# Frontend (client/.env)
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints Cheat Sheet

### Authentication
```
POST   /api/auth/register    Register new user
POST   /api/auth/login       Login user
GET    /api/auth/me          Get current user (Protected)
```

### Posts
```
GET    /api/posts            Get all posts
GET    /api/posts/:id        Get single post
POST   /api/posts            Create post (Protected)
PUT    /api/posts/:id        Update post (Protected)
DELETE /api/posts/:id        Delete post (Protected)
GET    /api/posts/my/posts   Get user's posts (Protected)
```

### Upload
```
POST   /api/upload           Upload image (Protected, multipart/form-data)
```

## 🎯 Two-Step Upload Flow (Key Concept)

```
Step 1: Upload Image
User → Select Image → Upload to Cloudinary → Get URL → Store in State

Step 2: Create Post
User → Fill Form → Submit (with URL) → Save to MongoDB → Redirect
```

## 💾 Database Schemas

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  timestamps
}
```

### Post
```javascript
{
  title: String,
  content: String,
  coverImage: String (Cloudinary URL or null),  // ← KEY FIELD
  author: ObjectId (ref: User),
  timestamps
}
```

## 🖼️ Image Upload Component Usage

```jsx
import ImageUpload from '../components/ImageUpload';

const CreatePost = () => {
  const [coverImageUrl, setCoverImageUrl] = useState(null);

  const handleImageUploaded = (url) => {
    setCoverImageUrl(url);
  };

  return (
    <ImageUpload onImageUploaded={handleImageUploaded} />
  );
};
```

## 🎨 Dashboard Conditional Rendering

```jsx
{post.coverImage && (
  <img 
    src={post.coverImage} 
    alt={`Cover image for ${post.title}`}
    className="post-cover-image"
  />
)}
```

## 🔧 Common Tasks

### Check MongoDB Data
```bash
mongosh
use fullstack_assignment
db.posts.find().pretty()
db.users.find().pretty()
exit
```

### Clear MongoDB Data
```bash
mongosh
use fullstack_assignment
db.posts.deleteMany({})
db.users.deleteMany({})
exit
```

### Restart Servers
```bash
# Stop: Ctrl+C in both terminals

# Restart backend
npm run dev

# Restart frontend
cd client && npm run dev
```

### Fix Port In Use Error
```bash
# Find process on port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

## 📋 Testing Checklist

Quick tests to verify everything works:

1. ✅ Register new user
2. ✅ Login with credentials
3. ✅ Create post without image
4. ✅ Create post with image
5. ✅ View posts on dashboard
6. ✅ Verify MongoDB has data
7. ✅ Verify Cloudinary has images

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection failed | Check if MongoDB is running: `mongod` |
| Cloudinary upload failed | Verify credentials in .env |
| CORS errors | Ensure backend on 5000, frontend on 5173 |
| Module not found | Run `npm install` in both root and client |
| Port already in use | Kill process: `lsof -i :5000` then `kill -9 <PID>` |
| Image not displaying | Check browser console, verify Cloudinary URL |

## 📱 Browser DevTools Tips

### Check Authentication
```javascript
// Console
localStorage.getItem('token')
localStorage.getItem('user')
```

### Check API Calls
- Network Tab → Filter: XHR
- Look for /api/upload and /api/posts
- Check request payload and response

### Clear Storage
```javascript
// Console
localStorage.clear()
```

## 🎓 Key Learning Points

1. **Two-Step Upload Architecture**
   - Separate image upload from post creation
   - Store Cloudinary URL in MongoDB, not local path

2. **FormData Handling**
   - Don't set Content-Type header manually
   - Let browser set it with boundary

3. **Conditional Rendering**
   - Check if coverImage exists before rendering
   - Graceful degradation for missing images

4. **State Management**
   - Parent component manages URL
   - Child component handles upload

5. **Error Handling**
   - User feedback via toasts
   - Loading states during async operations

## 📚 File Structure at a Glance

```
fullsatck_assignment/
├── client/                 Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    Reusable components
│   │   ├── pages/         Page components
│   │   ├── context/       State management
│   │   ├── utils/         Helper functions
│   │   └── styles/        CSS files
│   └── package.json
├── config/                Configuration files
├── controllers/           Business logic
├── middleware/            Express middleware
├── models/                Database schemas
├── routes/                API routes
├── .env                   Environment variables
├── server.js              Express server
└── package.json           Dependencies
```

## 🔗 Useful URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/api/health
- MongoDB: mongodb://localhost:27017
- Cloudinary Console: https://console.cloudinary.com/

## 💡 Pro Tips

1. Always check browser console for errors
2. Use Network tab to debug API calls
3. Verify .env file has correct credentials
4. Test with different image sizes/types
5. Check MongoDB to verify data storage
6. Look in Cloudinary Media Library for uploaded images

---

**Keep this file open while developing for quick reference!**
