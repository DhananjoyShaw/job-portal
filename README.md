# JobForge - Full-Stack Job Portal

A modern job portal application that connects students with recruiters, featuring role-based authentication, job posting/application management, and real-time search functionality.


## 🚀 Live Demo

[JOBFORGE](https://job-portal-cnof.onrender.com)


## 📱 Screenshots

<div align="center">

![Home Page](frontend/public/README%20images/home_page.png)
**Home Page**

![Job Section](frontend/public/README%20images/job_section.png)
**Job Section**

![Job Filter](frontend/public/README%20images/job_filter.png)
**Apply Filters in Job Section**

![Profile Page](frontend/public/README%20images/profile_page.png)
**User Profile Page with Applied Jobs**

![Admin Company](frontend/public/README%20images/admin_company.png)
**Company Page - Admin Panel**

![Company Setup](frontend/public/README%20images/company_setup.png)
**Company Setup**

![Admin Job](frontend/public/README%20images/admin_job.png)
**Job Page - Admin Panel**

![Job Setup](frontend/public/README%20images/job_setup.png)
**Job Setup**

![Job Applicants](frontend/public/README%20images/job_applicants.png)
**Admin/Recruiter can see Job Applicants**

</div>


## ✨ Features

### For Students
- **User Authentication**: Secure login/signup with role-based access
- **Job Discovery**: Browse and search through available job postings
- **Advanced Filtering**: Filter jobs by location, salary, experience level, and job type
- **Job Applications**: Apply to jobs with one-click functionality
- **Profile Management**: Update personal information, skills, and upload resume
- **Application Tracking**: View status of submitted applications

### For Recruiters
- **Company Management**: Create and manage company profiles
- **Job Posting**: Create, edit, and delete job postings
- **Applicant Management**: View and manage job applications
- **Dashboard**: Admin panel for managing companies and jobs
- **Real-time Updates**: Track application status and job performance

### Technical Features
- **Responsive Design**: Modern UI that works on all devices
- **Real-time Search**: Instant job search with keyword matching
- **File Upload**: Resume and profile photo uploads via Cloudinary
- **JWT Authentication**: Secure token-based authentication
- **State Management**: Redux for efficient state handling


## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- Multer
- Cloudinary
- CORS
- dotenv

### Frontend
- React
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Radix UI
- Framer Motion
- Axios
- Vite
- Lucide React
- Sonner


## 📁 Project Structure

```
job-portal/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── admin/           # Admin panel components
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── redux/          # Redux store and slices
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── backend/                 # Node.js backend API
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middlewares
│   └── utils/             # Utility functions
└── README.md              # This file
```


## 🔧 API Endpoints

### User
- `POST /api/v1/user/register` – Register new user
- `POST /api/v1/user/login` – User login
- `GET /api/v1/user/logout` – User logout
- `PUT /api/v1/user/update` – Update user profile

### Company
- `GET /api/v1/company/get` – Get all companies
- `POST /api/v1/company/create` – Create new company
- `PUT /api/v1/company/:id` – Update company

### Job
- `GET /api/v1/job/get` – Get all jobs (with search)
- `POST /api/v1/job/create` – Create new job
- `GET /api/v1/job/:id` – Get job by ID
- `PUT /api/v1/job/:id` – Update job
- `DELETE /api/v1/job/:id` – Delete job

### Application
- `GET /api/v1/application/apply/:id` – Apply for a job
- `GET /api/v1/application/get` – Get user 


## 📱 Pages & Components

### Public Pages
- **Home** (`/`) - Landing page with hero section and latest jobs
- **Jobs** (`/jobs`) - Job listing with search and filters
- **Job Description** (`/description/:id`) - Detailed job view
- **Browse** (`/browse`) - Advanced job browsing
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - User registration

### Admin Pages (Recruiters)
- **Companies** (`/admin/companies`) - Company management
- **Create Company** (`/admin/companies/create`) - Add new company
- **Company Setup** (`/admin/companies/:id`) - Edit company details
- **Jobs** (`/admin/jobs`) - Job management
- **Post Job** (`/admin/jobs/create`) - Create new job posting
- **Job Setup** (`/admin/job/:id`) - Edit job details
- **Applicants** (`/admin/job/applicants/:id`) - View job applicants

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

⭐ If you found this project helpful, please give it a star!

