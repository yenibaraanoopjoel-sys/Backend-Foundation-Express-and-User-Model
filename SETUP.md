# Complete Setup Instructions

## Quick Start

Follow these steps to get the full-stack image upload system running on your machine.

## Step 1: Prerequisites

Install the following on your system:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **MongoDB**
   - Option A: Local Installation
     - Download from: https://www.mongodb.com/try/download/community
     - Start MongoDB: `mongod`
   - Option B: MongoDB Atlas (Cloud)
     - Sign up at: https://www.mongodb.com/cloud/atlas
     - Create free cluster and get connection string

3. **Git**
   - Download from: https://git-scm.com/
   - Verify: `git --version`

4. **Cloudinary Account**
   - Sign up at: https://cloudinary.com/
   - Free tier is sufficient

## Step 2: Get Cloudinary Credentials

1. Go to https://cloudinary.com/
2. Sign up for a free account
3. After login, go to Dashboard
4. Note down:
   - Cloud Name
   - API Key
   - API Secret

## Step 3: Clone and Install

```bash
# Clone the repository (if from GitHub)
git clone https://github.com/yenibaraanoopjoel-sys/fullsatck_assignment.git
cd fullsatck_assignment

# OR if starting fresh, you already have the files

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

## Step 4: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your credentials
```

Your `.env` should look like this:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fullstack_assignment
JWT_SECRET=your_super_secret_jwt_key_change_this_to_something_random_and_secure
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name_from_cloudinary
CLOUDINARY_API_KEY=your_actual_api_key_from_cloudinary
CLOUDINARY_API_SECRET=your_actual_api_secret_from_cloudinary
NODE_ENV=development
```

**Important**: Replace the placeholder values with your actual credentials!

### For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fullstack_assignment?retryWrites=true&w=majority
```

## Step 5: Start the Application

You need TWO terminal windows/tabs:

### Terminal 1: Backend Server

```bash
# From project root
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

### Terminal 2: Frontend Development Server

```bash
# From project root
cd client
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Step 6: Access the Application

1. Open your browser
2. Go to: http://localhost:5173
3. You should see the PostHub homepage

## Step 7: Test the Application

### First Test: User Registration

1. Click "Get Started" or "Register"
2. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: test123
   - Confirm Password: test123
3. Click "Register"
4. ✅ You should be redirected to Dashboard

### Second Test: Create Post Without Image

1. Click "Create Post" in navbar
2. Enter:
   - Title: My First Post
   - Content: This is my first post!
3. Click "Create Post"
4. ✅ Post should appear on Dashboard

### Third Test: Create Post With Image

1. Click "Create Post"
2. Enter title and content
3. Click "Choose File" under Cover Image
4. Select an image from your computer (JPG, PNG, GIF, WEBP)
5. Click "Upload to Cloudinary"
6. Wait for success message
7. Click "Create Post"
8. ✅ Post should appear on Dashboard with the image

## Troubleshooting

### MongoDB Connection Failed

**Error**: `MongooseError: connect ECONNREFUSED`

**Solutions**:
1. Make sure MongoDB is running: `mongod`
2. Check your MONGODB_URI in `.env`
3. If using Atlas, check your connection string

### Cloudinary Upload Failed

**Error**: `Error uploading to Cloudinary`

**Solutions**:
1. Verify Cloudinary credentials in `.env`
2. Make sure you copied them correctly (no extra spaces)
3. Check your Cloudinary account is active

### CORS Errors

**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solutions**:
1. Make sure backend is running on port 5000
2. Check frontend is running on port 5173
3. Restart both servers

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solutions**:
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port in .env
PORT=5001
```

### Module Not Found

**Error**: `Cannot find module 'express'`

**Solutions**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# For frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

## Verification Checklist

Before considering setup complete:

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] MongoDB connected successfully
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Can create post without image
- [ ] Can create post with image
- [ ] Image uploads to Cloudinary
- [ ] Dashboard displays posts correctly
- [ ] Images appear on posts

## Next Steps

Once setup is complete:

1. Read the [TESTING.md](TESTING.md) guide for comprehensive testing
2. Check [README.md](README.md) for full documentation
3. Explore the codebase:
   - Backend: `server.js`, `routes/`, `controllers/`, `models/`
   - Frontend: `client/src/`

## Database Verification

To check if data is being stored:

```bash
# Open MongoDB shell
mongosh

# Use your database
use fullstack_assignment

# List all collections
show collections

# View users
db.users.find().pretty()

# View posts
db.posts.find().pretty()

# Exit
exit
```

## Cloudinary Verification

1. Go to https://console.cloudinary.com/
2. Login with your account
3. Go to Media Library
4. Look for "post_covers" folder
5. Your uploaded images should be there

## Common Questions

**Q: Do I need to create the database manually?**
A: No, MongoDB will automatically create it when you first save data.

**Q: Can I use a different port?**
A: Yes, change PORT in `.env` and update VITE_API_URL in `client/.env`

**Q: Is Cloudinary free?**
A: Yes, the free tier includes 25GB storage and 25GB bandwidth/month.

**Q: Can I deploy this?**
A: Yes! Backend can be deployed to Heroku/Railway/Render, frontend to Vercel/Netlify.

## Support

If you encounter issues:

1. Check the error message carefully
2. Review this setup guide
3. Check the troubleshooting section
4. Verify all environment variables are correct
5. Make sure all dependencies are installed

## Success!

If you can create a post with an image and see it on the dashboard, you're all set! 🎉

The application is now running and ready for development or demonstration.
