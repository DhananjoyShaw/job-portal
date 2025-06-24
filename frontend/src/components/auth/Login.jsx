import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice.js'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constants.js'
import { toast } from 'sonner'
import { Loader2, Mail, Lock } from 'lucide-react'

const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-16 mt-10'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-xl shadow-lg p-8 bg-white'>
                    <h1 className='font-bold text-2xl mb-6 text-center text-gray-800'>Login</h1>
                    <div className='my-4'>
                        <Label className='text-sm font-medium text-gray-700'>Email</Label>
                        <div className='relative mt-1'>
                            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="Enter your email"
                                className='pl-10 border-gray-300 focus:border-blue-500'
                            />
                        </div>
                    </div>
                    <div className='my-4'>
                        <Label className='text-sm font-medium text-gray-700'>Password</Label>
                        <div className='relative mt-1'>
                            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="Enter your password"
                                className='pl-10 border-gray-300 focus:border-blue-500'
                            />
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-4 h-4 text-blue-600"
                                />
                                <Label className='cursor-pointer text-gray-700'>Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-4 h-4 text-blue-600"
                                />
                                <Label className='cursor-pointer text-gray-700'>Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? (
                            <Button disabled className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg">
                                Login
                            </Button>
                        )
                    }
                    <span className='text-sm text-center block text-gray-600'>
                        Don't have an account? <Link to="/signup" className='text-blue-600 hover:text-blue-700 font-medium'>Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login;