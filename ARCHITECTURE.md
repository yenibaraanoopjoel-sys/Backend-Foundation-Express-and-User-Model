# System Architecture Documentation

## Overview

This is a full-stack MERN application implementing an image upload system with Cloudinary integration. The architecture follows a clear separation of concerns with a RESTful API backend and a React frontend.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│                      (React + Vite)                          │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Pages      │  │  Components  │  │   Context    │     │
│  │              │  │              │  │              │     │
│  │ - Home       │  │ - Navbar     │  │ - Auth       │     │
│  │ - Login      │  │ - ImageUpload│  │              │     │
│  │ - Register   │  │ - Private    │  │              │     │
│  │ - Dashboard  │  │   Route      │  │              │     │
│  │ - CreatePost │  │              │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Axios API Client (utils/api.js)            │  │
│  │    - JWT Token Interceptor                            │  │
│  │    - Error Handling                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTP/HTTPS
                           │
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                              │
│                    (Express.js + Node)                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   API Routes                          │  │
│  │                                                       │  │
│  │  /api/auth/*     - Authentication                    │  │
│  │  /api/posts/*    - Post Management                   │  │
│  │  /api/upload     - Image Upload                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Controllers  │  │  Middleware  │  │    Models    │     │
│  │              │  │              │  │              │     │
│  │ - auth       │  │ - auth       │  │ - User       │     │
│  │ - posts      │  │ - upload     │  │ - Post       │     │
│  │ - upload     │  │              │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
           │                                    │
           │                                    │
           ▼                                    ▼
┌──────────────────────┐          ┌──────────────────────┐
│     Cloudinary       │          │      MongoDB         │
│   (Image Storage)    │          │   (Data Storage)     │
│                      │          │                      │
│  - Image Upload      │          │  - Users Collection  │
│  - Transformation    │          │  - Posts Collection  │
│  - CDN Delivery      │          │                      │
└──────────────────────┘          └──────────────────────┘
```

## Data Flow

### 1. User Registration/Login Flow

```
User → Register/Login Form → Frontend Validation → API Request
                                                        │
                                                        ▼
Backend receives request → Validate data → Hash password (bcrypt)
                                                        │
                                                        ▼
Save to MongoDB → Generate JWT token → Send token to Frontend
                                                        │
                                                        ▼
Frontend stores token → Redirect to Dashboard
```

### 2. Two-Step Image Upload Flow

```
Step 1: Image Upload to Cloudinary
═════════════════════════════════════

User selects image → Preview in browser → Click "Upload to Cloudinary"
                                                        │
                                                        ▼
FormData created → POST /api/upload (with JWT token)
                                                        │
                                                        ▼
Backend (Multer) → Validate file → Stream to Cloudinary
                                                        │
                                                        ▼
Cloudinary → Transform & Store → Return secure_url
                                                        │
                                                        ▼
Frontend stores URL in state (coverImageUrl)


Step 2: Post Creation with Image URL
════════════════════════════════════

User fills title & content → Click "Create Post"
                                                        │
                                                        ▼
POST /api/posts with { title, content, coverImage: URL }
                                                        │
                                                        ▼
Backend creates Post document → Save to MongoDB
                                                        │
                                                        ▼
Success response → Redirect to Dashboard → Display post with image
```

### 3. Dashboard Display Flow

```
User visits Dashboard → GET /api/posts
                                │
                                ▼
Backend queries MongoDB → Populate author details
                                │
                                ▼
Return posts array → Frontend receives data
                                │
                                ▼
For each post:
  - Render post card
  - If coverImage exists → <img src={coverImage} />
  - Else → Render without image
```

## Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String (required, 2-50 chars),
  email: String (required, unique, validated),
  password: String (required, hashed, min 6 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model

```javascript
{
  _id: ObjectId,
  title: String (required, 3-200 chars),
  content: String (required, min 10 chars),
  coverImage: String (nullable, Cloudinary URL),
  author: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login user |
| GET | /api/auth/me | Protected | Get current user |

### Post Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/posts | Public | Get all posts |
| GET | /api/posts/:id | Public | Get single post |
| POST | /api/posts | Protected | Create new post |
| PUT | /api/posts/:id | Protected | Update post |
| DELETE | /api/posts/:id | Protected | Delete post |
| GET | /api/posts/my/posts | Protected | Get user's posts |

### Upload Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/upload | Protected | Upload image to Cloudinary |

## Security Measures

### Backend Security

1. **Password Hashing**
   - bcryptjs with salt rounds
   - Never store plaintext passwords

2. **JWT Authentication**
   - Token-based authentication
   - Expires in 30 days
   - Stored in localStorage

3. **Route Protection**
   - Middleware validates JWT
   - Unauthorized requests get 401

4. **File Upload Validation**
   - File type validation (images only)
   - File size limit (5MB)
   - Multer configuration

### Frontend Security

1. **Protected Routes**
   - PrivateRoute component
   - Redirects to login if not authenticated

2. **Token Management**
   - Auto-attach token to requests
   - Auto-logout on 401

3. **Input Validation**
   - Client-side validation
   - Error messages for invalid input

## State Management

### Frontend State

```javascript
// Global State (Context API)
- AuthContext
  - user: User object or null
  - token: JWT string or null
  - isAuthenticated: boolean
  - login(), register(), logout()

// Component State (useState)
- CreatePost
  - formData: { title, content }
  - coverImageUrl: string or null
  - loading: boolean

- ImageUpload
  - selectedImage: File or null
  - previewUrl: string or null
  - uploading: boolean
  - uploadSuccess: boolean
  - error: string or null

- Dashboard
  - posts: array
  - loading: boolean
```

## Image Upload Process (Detailed)

### Frontend (ImageUpload.jsx)

1. **File Selection**
   ```javascript
   handleFileSelect(e) {
     - Get file from input
     - Validate type (jpeg, png, gif, webp)
     - Validate size (<5MB)
     - Create preview with FileReader
     - Store in state
   }
   ```

2. **Upload to Cloudinary**
   ```javascript
   handleUpload() {
     - Create FormData
     - Append image file
     - POST to /api/upload
     - Set Content-Type: multipart/form-data
     - Receive secure_url
     - Pass URL to parent component
   }
   ```

### Backend (uploadController.js)

1. **Receive Upload**
   ```javascript
   - Multer middleware processes file
   - File stored in memory (buffer)
   - Validate file exists
   ```

2. **Upload to Cloudinary**
   ```javascript
   - Create readable stream from buffer
   - Upload to Cloudinary with options:
     * folder: 'post_covers'
     * transformations: resize, quality, format
   - Return secure_url to frontend
   ```

### Cloudinary Storage

```
- Images stored in 'post_covers' folder
- Auto transformations:
  * Max dimensions: 1200x630
  * Quality: auto
  * Format: auto (WebP on supported browsers)
- CDN delivery for fast loading
```

## Component Hierarchy

```
App
├── AuthProvider
│   └── Router
│       ├── Navbar
│       └── Routes
│           ├── Home
│           ├── Login
│           ├── Register
│           ├── Dashboard (Protected)
│           │   └── PostCard (multiple)
│           └── CreatePost (Protected)
│               ├── Form
│               └── ImageUpload
└── ToastContainer
```

## Technology Stack Details

### Frontend

- **React 18**: UI library with hooks
- **Vite**: Fast build tool and dev server
- **React Router v6**: Client-side routing
- **Axios**: HTTP client with interceptors
- **React Toastify**: Toast notifications
- **Context API**: Global state management

### Backend

- **Express 4**: Web framework
- **Mongoose 8**: MongoDB ODM
- **JWT**: Token-based authentication
- **bcryptjs**: Password hashing
- **Multer**: File upload handling
- **Cloudinary**: Cloud image storage
- **CORS**: Cross-origin requests

### Database & Storage

- **MongoDB**: NoSQL database
- **Cloudinary**: Image CDN and storage

## Performance Optimizations

1. **Frontend**
   - React lazy loading (can be added)
   - Image optimization via Cloudinary
   - Toast auto-close (3s)
   - Conditional rendering

2. **Backend**
   - Mongoose lean queries (can be added)
   - Cloudinary transformations
   - Efficient indexing (can be added)

3. **Database**
   - Email unique index
   - Author reference for efficient queries

## Error Handling Strategy

### Frontend
- Try-catch blocks for async operations
- Toast notifications for user feedback
- Loading states during async operations
- Form validation before submission

### Backend
- Global error handler middleware
- Mongoose validation errors
- JWT verification errors
- Multer file upload errors
- Cloudinary upload errors

## Deployment Architecture

### Production Setup

```
┌─────────────────┐
│   Vercel/       │  Frontend hosting
│   Netlify       │  (Static files)
└────────┬────────┘
         │
         │ API calls
         │
┌────────▼────────┐
│   Heroku/       │  Backend hosting
│   Railway/      │  (Node.js server)
│   Render        │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼──┐  ┌──▼──────┐
│ Atlas│  │Cloudinary│
│(DB)  │  │ (Images)│
└──────┘  └─────────┘
```

## Future Enhancements

1. **Features**
   - Post editing and deletion
   - User profiles
   - Post likes and comments
   - Image gallery
   - Multiple image upload
   - Rich text editor

2. **Performance**
   - Redis caching
   - Image lazy loading
   - Pagination
   - Infinite scroll

3. **Security**
   - Rate limiting
   - Refresh tokens
   - CSRF protection
   - Input sanitization

4. **Testing**
   - Unit tests (Jest)
   - Integration tests
   - E2E tests (Playwright)

## Conclusion

This architecture provides:
- **Scalability**: Can handle growing user base
- **Maintainability**: Clear separation of concerns
- **Security**: Multiple layers of protection
- **Performance**: Optimized image delivery
- **User Experience**: Smooth upload flow with feedback
