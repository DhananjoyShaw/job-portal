# JobForge Frontend

## 🛠️ Tech Stack
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
frontend/src/
├── admin/             # Admin panel components
│   ├── AdminJobs.jsx
│   ├── AdminJobsTable.jsx
│   ├── Applicants.jsx
│   ├── ApplicantsTable.jsx
│   ├── Companies.jsx
│   ├── CompaniesTable.jsx
│   ├── CompanyCreate.jsx
│   ├── CompanySetup.jsx
│   ├── JobSetup.jsx
│   ├── PostJob.jsx
│   └── ProtectedRoute.jsx
├── components/        # Reusable UI components
│   ├── auth/         # Authentication components
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── shared/       # Shared components
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── ui/           # UI components (Radix UI)
│   │   ├── avatar.jsx
│   │   ├── badge.jsx
│   │   ├── button.jsx
│   │   ├── carousel.jsx
│   │   ├── dialog.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   ├── popover.jsx
│   │   ├── radio-group.jsx
│   │   ├── select.jsx
│   │   ├── sonner.jsx
│   │   └── table.jsx
│   ├── AppliedJobTable.jsx
│   ├── Browse.jsx
│   ├── CategoryCarousel.jsx
│   ├── FilterCard.jsx
│   ├── HeroSection.jsx
│   ├── Home.jsx
│   ├── Job.jsx
│   ├── JobDescription.jsx
│   ├── Jobs.jsx
│   ├── LatestJobCards.jsx
│   ├── LatestJobs.jsx
│   ├── Profile.jsx
│   └── UpdateProfileDialog.jsx
├── hooks/            # Custom React hooks
│   ├── useGetAllAdminJobs.jsx
│   ├── useGetAllApplicants.jsx
│   ├── useGetAllCompanies.jsx
│   ├── useGetAllJobs.jsx
│   ├── useGetAppliedJobs.jsx
│   ├── useGetCompanyByID.jsx
│   └── useGetJobByID.jsx
├── redux/           # Redux store and slices
│   ├── applicationSlice.js
│   ├── authSlice.js
│   ├── companySlice.js
│   ├── jobSlice.js
│   └── store.js
├── utils/           # Utility functions
│   └── constants.js
├── assets/          # Static assets
│   └── logo_new.png
├── App.jsx          # Main App component
├── main.jsx         # Entry point
├── index.css        # Global styles
└── App.css          # App-specific styles
```

