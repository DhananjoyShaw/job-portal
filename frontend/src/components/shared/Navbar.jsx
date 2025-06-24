import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Home, Briefcase, Search, Building2 } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constants.js'
import { toast } from 'sonner'
import logo from '../../assets/logo_new.png';
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const isActive = (path) => {
        return location.pathname === path;
    }

    return (
        <div className='bg-white/80 backdrop-blur-md z-50 border-b border-gray-200 fixed top-0 w-full shadow-sm'>
            <div className='max-w-7xl mx-auto py-5'>
                <div className='flex items-center justify-between'>

                    <div className='flex items-center gap-3'>
                        <Link to="/" className='flex items-center gap-1 hover:opacity-80 transition-opacity'>
                            <img src={logo} alt="JobForge Logo" className='w-10 h-auto object-contain' />
                            <h1 className='text-3xl font-bold text-gray-900'>Job<span className='text-[#F83002]'>Forge</span></h1>
                        </Link>
                    </div>

                    <div className='flex items-center gap-8'>
                        <nav className='flex items-center gap-1'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <Link
                                            to="/admin/companies"
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive('/admin/companies')
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Building2 className='w-4 h-4' />
                                            Companies
                                        </Link>
                                        <Link
                                            to="/admin/jobs"
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive('/admin/jobs')
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Briefcase className='w-4 h-4' />
                                            Jobs
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/"
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive('/')
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Home className='w-4 h-4' />
                                            Home
                                        </Link>
                                        <Link
                                            to="/jobs"
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive('/jobs')
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Briefcase className='w-4 h-4' />
                                            Jobs
                                        </Link>
                                        <Link
                                            to="/browse"
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive('/browse')
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Search className='w-4 h-4' />
                                            Browse
                                        </Link>
                                    </>
                                )
                            }
                        </nav>

                        {
                            !user ? (
                                <div className='flex items-center gap-3'>
                                    <Link to="/login"><Button variant="outline" className='border-gray-300 hover:bg-gray-50'>Login</Button></Link>
                                    <Link to="/signup"><Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">Sign Up</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-blue-200 transition-all duration-200">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-4">
                                        <div className='space-y-4'>
                                            <div className='flex items-center gap-3 pb-4 border-b border-gray-100'>
                                                <Avatar className="w-12 h-12">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                                </Avatar>
                                                <div className='flex-1'>
                                                    <h4 className='font-semibold text-gray-900'>{user?.fullname}</h4>
                                                    <p className='text-sm mt-1 text-gray-600'>{user?.email}</p>
                                                    <p className='text-xs text-gray-500'>{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</p>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className='space-y-2'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <Link to="/profile">
                                                            <div className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer'>
                                                                <User2 className='w-4 h-4 text-gray-600' />
                                                                <span className='text-sm font-medium text-gray-700'>View Profile</span>
                                                            </div>
                                                        </Link>
                                                    )
                                                }
                                                <button
                                                    onClick={logoutHandler}
                                                    className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 cursor-pointer w-full text-left'
                                                >
                                                    <LogOut className='w-4 h-4 text-red-600' />
                                                    <span className='text-sm font-medium text-red-600'>Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;