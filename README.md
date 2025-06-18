# 💼 JobSaathi

**JobSaathi** is a full-stack job portal web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It allows users to search for jobs, apply, and manage their job applications, and also includes employer-side functionalities.

---

## 📁 Project Structure
JobSaathi/ ├── backend/        # Node.js + Express backend ├── frontend/       # React frontend (Vite) └── README.md

## 🚀 Getting Started

Follow the steps below to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/JobSaathi.git
cd JobSaathi

### 2. Install Dependencies

Open two terminals or tabs for each part of the app:

Backend

cd backend
npm install

Frontend

cd frontend
npm install



## 🖥️ Running the Project

### Start the Backend Server

cd backend
node server.js

The backend server will start on http://localhost:5000 (or your configured port).

###Start the Frontend (React + Vite)

cd frontend
npm run dev

The frontend will start on http://localhost:5173 (default Vite port).



##⚙️ Environment Variables Setup

You need to create a .env file in the backend directory with the following content:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret



##🧰 Tech Stack

Frontend: React, Vite, Tailwind CSS (optional), Axios

Backend: Node.js, Express

Database: MongoDB with Mongoose

Auth: JWT-based Authentication

File Uploads: Cloudinary

Others: dotenv, CORS, bcrypt, multer, etc.




## 📸 Features

✅ User Authentication (Register/Login)

✅ Job Listings and Search

✅ Apply for Jobs

✅ Post and Manage Jobs (Employer)

✅ Profile Management

✅ Resume/Image Uploads via Cloudinary
