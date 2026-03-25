#!/bin/bash

echo "🚀 Starting Full-Stack Image Upload Application"
echo "================================================"

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please create .env file with your credentials."
    echo "See .env.example for reference."
    exit 1
fi

echo "✅ Found .env file"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Check if client/node_modules exists
if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd client && npm install && cd ..
fi

echo ""
echo "🎯 Starting servers..."
echo "======================"
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
npm run dev &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
cd client && npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
