# 🚀 How to Start - Quick Guide

**For people who want to run the project immediately!**

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies (2 min)

```bash
# Backend
npm install

# Frontend
cd client
npm install
cd ..
```

### Step 2: Configure Environment (2 min)

```bash
# Create .env file
cp .env.example .env
```

**Edit `.env` with your credentials:**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fullstack_assignment
JWT_SECRET=any_random_secret_string_here
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
NODE_ENV=development
```

**Get Cloudinary credentials:**
1. Go to https://cloudinary.com/users/register_free
2. Sign up (free)
3. Dashboard → Copy: Cloud Name, API Key, API Secret

### Step 3: Start Servers (1 min)

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Step 4: Open Browser

Go to: **http://localhost:5173**

---

## ✅ First Test (3 Minutes)

### 1. Register (30 sec)
- Click "Get Started"
- Enter: name, email, password
- Click "Register"

### 2. Create Post Without Image (30 sec)
- Click "Create Post"
- Enter title and content
- Click "Create Post"
- ✅ See your post on dashboard

### 3. Create Post With Image (2 min)
- Click "Create Post"
- Enter title and content
- Click "Choose File" → Select image
- Click "Upload to Cloudinary" → Wait for success
- Click "Create Post"
- ✅ See your post with image on dashboard

---

## 🎯 That's It!

You're done! The application is running.

---

## 📚 Next Steps

Want to learn more?

1. **Understand the project** → Read [README.md](README.md)
2. **Test thoroughly** → Follow [TESTING.md](TESTING.md)
3. **Learn the architecture** → Read [ARCHITECTURE.md](ARCHITECTURE.md)
4. **See diagrams** → View [WORKFLOW_DIAGRAM.md](WORKFLOW_DIAGRAM.md)

---

## 🐛 Something Not Working?

### MongoDB Connection Error
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with Atlas connection string
```

### Cloudinary Upload Error
- Check credentials in `.env`
- Make sure you copied them correctly (no spaces)
- Verify your Cloudinary account is active

### Port Already in Use
```bash
# Find what's using port 5000
lsof -i :5000

# Kill it
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### Can't Find Module
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Same for frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

---

## 🎓 What This Project Does

A full-stack application where users can:
- Register and login
- Create posts with text
- Upload cover images to Cloudinary
- View all posts on a dashboard
- See posts with/without images rendered properly

**Key Feature:** Two-step upload flow
1. Upload image to Cloudinary → Get URL
2. Create post with URL → Save to MongoDB

---

## 📁 Important Files

### Backend
- `server.js` - Main server file
- `models/Post.js` - Post schema with coverImage
- `controllers/uploadController.js` - Image upload logic
- `routes/uploadRoutes.js` - Upload endpoint

### Frontend
- `client/src/pages/CreatePost.jsx` - Post creation page
- `client/src/components/ImageUpload.jsx` - Image upload component
- `client/src/pages/Dashboard.jsx` - Display posts

### Config
- `.env` - Your credentials (create this!)
- `config/cloudinary.js` - Cloudinary setup
- `config/db.js` - MongoDB connection

---

## 💡 Pro Tips

1. **Keep both terminals open** (backend + frontend)
2. **Check browser console** for errors (F12)
3. **MongoDB must be running** (local or Atlas)
4. **Cloudinary credentials must be correct**
5. **Use images under 5MB**
6. **Supported formats:** JPG, PNG, GIF, WEBP

---

## 🔗 Useful URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health
- Cloudinary Dashboard: https://console.cloudinary.com/
- MongoDB (local): mongodb://localhost:27017

---

## 📊 Tech Stack (Quick)

- **Frontend:** React + Vite
- **Backend:** Express + Node.js
- **Database:** MongoDB
- **Storage:** Cloudinary
- **Auth:** JWT

---

## ⏱️ Time Breakdown

- Setup: 5 minutes
- First test: 3 minutes
- **Total: 8 minutes to running application!**

---

## 🎉 Success Criteria

You know it's working when:
- ✅ No errors in terminals
- ✅ Frontend opens in browser
- ✅ Can register and login
- ✅ Can create posts
- ✅ Can upload images
- ✅ Images appear on dashboard

---

## 📞 Need More Help?

See detailed guides:
- **Setup issues:** [SETUP.md](SETUP.md)
- **Testing:** [TESTING.md](TESTING.md)
- **Quick commands:** [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- **All docs:** [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

---

**🚀 Happy Coding!**

*This guide gets you from zero to running in under 10 minutes.*
