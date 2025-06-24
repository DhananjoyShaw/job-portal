import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, User, Mail, Phone, FileText, UserCheck } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constants.js'
import { setUser } from '../redux/authSlice.js'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    // console.log('Dialog open:', open);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }

        setOpen(false);
        console.log(input);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[500px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader className="pb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <UserCheck className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold text-gray-900">Update Profile</DialogTitle>
                                <p className="text-sm text-gray-600 mt-1">Update your personal information and preferences</p>
                            </div>
                        </div>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='space-y-6'>
                            <div className='space-y-2'>
                                <Label htmlFor="fullname" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </Label>
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your full name"
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your email address"
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Phone Number
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your phone number"
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                                    Bio
                                </Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    placeholder="Tell us about yourself"
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor="skills" className="text-sm font-medium text-gray-700">
                                    Skills
                                </Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your skills (comma separated)"
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor="file" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Resume
                                </Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                                <p className="text-xs text-gray-500">Upload your resume in PDF format</p>
                            </div>
                        </div>
                        <DialogFooter className="pt-6">
                            <div className="flex items-center gap-3 w-full">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Button>
                                {
                                    loading ? (
                                        <Button disabled className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            Updating...
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                                            Update Profile
                                        </Button>
                                    )
                                }
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog;