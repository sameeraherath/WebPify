# WebPify Deployment Guide

This guide will help you deploy WebPify to Vercel (frontend) and Render (backend).

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Render account (sign up at https://render.com)

## 🚀 Deployment Steps

### Part 1: Deploy Backend to Render

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Configure for deployment"
   git push origin main
   ```

2. **Go to Render Dashboard**
   - Visit https://render.com
   - Sign up/Login with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your WebPify repository
   - Configure the service:
     - **Name**: `webpify-api` (or your choice)
     - **Environment**: `Python 3`
     - **Build Command**: `cd server && pip install -r requirements.txt`
     - **Start Command**: `cd server && uvicorn main:app --host 0.0.0.0 --port $PORT`
     - **Root Directory**: Leave empty
     - **Python Version**: `3.11.0`
   - Click "Create Web Service"

4. **Wait for Build & Deploy**
   - Render will automatically build and deploy your backend
   - Note your service URL (e.g., `https://your-app.onrender.com`)

### Part 2: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign up/Login with GitHub

2. **Add New Project**
   - Click "Add New..." → "Project"
   - Import your WebPify repository
   - Configure the project:
     - **Framework Preset**: Create React App
     - **Root Directory**: `client/`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`
     - **Install Command**: `npm install`

3. **Add Environment Variable**
   - Click "Environment Variables"
   - Add new variable:
     - **Name**: `REACT_APP_API_URL`
     - **Value**: `https://your-app.onrender.com/api/convert`
       (Replace with your actual Render URL)
     - **Environments**: Production, Preview, Development

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Part 3: Optional - Update CORS for Better Security

After deployment, you can restrict CORS to only allow your Vercel domain:

1. In `server/main.py`, change line 111:
   ```python
   allow_origins=["https://your-app.vercel.app"],  # Your Vercel URL
   ```

2. Add your localhost for development:
   ```python
   allow_origins=[
       "https://your-app.vercel.app",
       "http://localhost:3000"
   ],
   ```

3. Redeploy to Render

## ✅ Verification

1. **Backend Health Check**
   - Visit: `https://your-app.onrender.com/api/health`
   - Should return: `{"status":"healthy","service":"WebPify API","version":"1.0.0"}`

2. **Backend API Docs**
   - Visit: `https://your-app.onrender.com/docs`
   - Should show Swagger UI

3. **Frontend**
   - Visit your Vercel deployment URL
   - Try uploading an image to test conversion

## 🔧 Troubleshooting

### Render Free Tier Behavior
- Render free tier services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds to respond
- Upgrade to paid plan for always-on service

### CORS Errors
- Make sure backend CORS allows your frontend domain
- Check that `allow_origins` includes your Vercel URL

### Build Failures
- Check build logs in Render/Vercel dashboard
- Ensure all dependencies are in `requirements.txt` (backend)
- Ensure all dependencies are in `package.json` (frontend)

### API Connection Issues
- Verify `REACT_APP_API_URL` environment variable is set correctly
- Check that backend is running (visit health endpoint)
- Check browser console for error messages

## 📝 Environment Variables Summary

### Vercel (Frontend)
- `REACT_APP_API_URL` - Your Render backend URL

### Render (Backend)
- `PORT` - Automatically set by Render
- `PYTHON_VERSION` - Set to 3.11.0 (via settings)

## 🎉 Success!

Once deployed, your app will be live at your Vercel URL!

