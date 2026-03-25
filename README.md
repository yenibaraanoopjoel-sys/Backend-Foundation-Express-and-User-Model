# Full-Stack Image Upload System with Cloudinary

A complete full-stack application featuring user authentication, post creation with image upload functionality, and Cloudinary integration for cloud storage.

## 🚀 Features

- **User Authentication**: Register, login, and JWT-based authentication
- **Post Creation**: Create posts with title and content
- **Image Upload**: Upload cover images to Cloudinary
- **Two-Step Upload Flow**: Separate image upload and post creation
- **Cloud Storage**: Images stored on Cloudinary with optimized transformations
- **Responsive Dashboard**: View all posts with cover images
- **Protected Routes**: Authentication-required pages
- **Toast Notifications**: User-friendly feedback messages

## 🛠️ Tech Stack

### Backend
- **Express.js**: Web application framework
- **MongoDB**: Database for storing users and posts
- **Mongoose**: ODM for MongoDB
- **Cloudinary**: Cloud-based image storage
- **Multer**: Middleware for handling multipart/form-data
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing

### Frontend
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **React Toastify**: Toast notifications
- **Context API**: State management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (free tier available)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yenibaraanoopjoel-sys/fullsatck_assignment.git
cd fullsatck_assignment
```

### 2. Backend Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### 3. Configure Environment Variables

Edit `.env` file with your credentials:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fullstack_assignment
JWT_SECRET=your_super_secret_jwt_key_here_change_this
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

**Getting Cloudinary Credentials:**
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Go to Dashboard
4. Copy your Cloud Name, API Key, and API Secret

### 4. Frontend Setup

```bash
cd client
npm install
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📁 Project Structure

```
fullstack-image-upload/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── CreatePost.jsx
│   │   ├── context/         # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── utils/           # Utilities
│   │   │   └── api.js
│   │   ├── styles/          # CSS files
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── config/                   # Backend configuration
│   ├── db.js
│   └── cloudinary.js
├── controllers/             # Route controllers
│   ├── authController.js
│   ├── postController.js
│   └── uploadController.js
├── middleware/              # Express middleware
│   ├── auth.js
│   └── upload.js
├── models/                  # Mongoose models
│   ├── User.js
│   └── Post.js
├── routes/                  # API routes
│   ├── authRoutes.js
│   ├── postRoutes.js
│   └── uploadRoutes.js
├── server.js               # Express server
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (Protected)
- `PUT /api/posts/:id` - Update post (Protected)
- `DELETE /api/posts/:id` - Delete post (Protected)
- `GET /api/posts/my/posts` - Get user's posts (Protected)

### Upload
- `POST /api/upload` - Upload image to Cloudinary (Protected)

## 🎯 Two-Step Upload Flow

### Frontend (CreatePost.jsx)

1. **Image Selection**: User selects an image file
2. **Preview**: Image preview is displayed
3. **Upload to Cloudinary**: User clicks "Upload to Cloudinary"
   - FormData is created with the image
   - POST request to `/api/upload`
   - Cloudinary URL is returned and stored in state
4. **Post Creation**: User fills in title and content
5. **Submit**: Post is created with coverImage URL
   - POST request to `/api/posts` with coverImage field

### Backend

1. **Upload Route** (`POST /api/upload`):
   - Receives multipart/form-data
   - Validates image (type, size)
   - Uploads to Cloudinary
   - Returns `secure_url`

2. **Post Creation Route** (`POST /api/posts`):
   - Receives JSON data including `coverImage` URL
   - Saves post to MongoDB with coverImage field

## 🎨 Post Schema

```javascript
{
  title: String (required),
  content: String (required),
  coverImage: String (default: null),
  author: ObjectId (ref: User),
  timestamps: true
}
```

## 🖼️ Image Upload Component Features

- File type validation (JPEG, PNG, GIF, WEBP)
- File size validation (5MB max)
- Image preview before upload
- Loading state during upload
- Success/error feedback
- Remove image functionality
- Cloudinary URL returned to parent component

## 📱 Dashboard Features

- Displays all posts in a responsive grid
- Conditionally renders cover images
- Shows post title, content preview (150 chars)
- Displays author name and creation date
- Clean rendering for posts without images
- Hover effects on post cards

## 🧪 Testing Checklist

- [ ] Create post with image
- [ ] Create post without image
- [ ] Image upload failure handling
- [ ] Image appears on dashboard
- [ ] MongoDB stores Cloudinary URL
- [ ] Cloudinary Media Library shows image
- [ ] Image validation (type, size)
- [ ] User authentication works
- [ ] Protected routes redirect to login
- [ ] Toast notifications appear

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Authorization checks for post operations
- File type and size validation
- Secure Cloudinary upload

## 📝 MongoDB Verification

To verify images are stored correctly:

```bash
# Connect to MongoDB
mongosh

# Use database
use fullstack_assignment

# Check posts collection
db.posts.find().pretty()

# You should see coverImage field with Cloudinary URLs
```

## 🌐 Cloudinary Verification

1. Go to [Cloudinary Console](https://console.cloudinary.com/)
2. Navigate to Media Library
3. Look for `post_covers` folder
4. Your uploaded images should be there

## 🎨 Image Transformations

Cloudinary automatically optimizes images:
- Max dimensions: 1200x630
- Auto quality
- Auto format
- Stored in `post_covers` folder

## 🚀 Deployment

### Backend (Heroku/Railway)

```bash
# Set environment variables
# Deploy using your preferred platform
```

### Frontend (Vercel/Netlify)

```bash
cd client
npm run build
# Deploy dist folder
```

## 🐛 Troubleshooting

### Images Not Uploading
- Check Cloudinary credentials in `.env`
- Verify file size is under 5MB
- Check file type is allowed
- Check network tab for errors

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check MONGODB_URI in `.env`
- Verify network connectivity

### CORS Errors
- Ensure backend CORS is configured
- Check frontend API URL

## 📚 Learning Objectives

✅ Backend Schema Updates (coverImage field)  
✅ Two-Step Upload Architecture  
✅ FormData Handling  
✅ Cloudinary Integration  
✅ Image Validation  
✅ Loading States & Error Handling  
✅ Conditional Rendering  
✅ State Management  
✅ Professional Git Workflow  

## 👤 Author

**anoop-joel**  
Email: yenibara.anoopjoel@gmail.com

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Cloudinary for cloud image storage
- MongoDB for database
- React team for amazing UI library
- Express.js for backend framework
