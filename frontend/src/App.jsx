import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home.jsx';
import Jobs from './components/Jobs.jsx';
import Browse from './components/Browse.jsx';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './admin/Companies';
import CompanyCreate from './admin/CompanyCreate';
import CompanySetup from './admin/CompanySetup';
import AdminJobs from './admin/AdminJobs';
import PostJob from './admin/PostJob';
import JobSetup from './admin/JobSetup';
import Applicants from './admin/Applicants';
import ProtectedRoute from './admin/ProtectedRoute';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },

  // admin routes
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute> <PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/job/:id",
    element: <ProtectedRoute><JobSetup /></ProtectedRoute>
  },
  {
    path: "/admin/job/applicants/:id",
    element: <ProtectedRoute> <Applicants /></ProtectedRoute>
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App;
