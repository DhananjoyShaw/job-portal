import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, User, FileText, Briefcase } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable.jsx'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Footer from './shared/Footer'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto min-h-screen px-4 py-8 mt-20'>

                {/* Profile Header Card */}
                <div className='bg-white border border-gray-200 rounded-2xl shadow-lg p-8 mb-8'>
                    <div className='flex justify-between items-start'>
                        <div className='flex items-center gap-6'>
                            <Avatar className="h-24 w-24 border-4 border-gray-100 shadow-md">
                                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                            </Avatar>
                            <div>
                                <h1 className='font-bold text-2xl text-gray-900 mb-2'>{user?.fullname}</h1>
                                <p className='text-gray-600 text-lg'>{user?.profile?.bio || 'No bio available'}</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setOpen(true)}
                            className="gradient2 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                            variant="outline"
                        >
                            <Pen className='w-4 h-4 mr-2' />
                            Edit Profile
                        </Button>
                    </div>

                    <div className='mt-8 grid md:grid-cols-2 gap-4'>
                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                            <Mail className='w-5 h-5 text-blue-600' />
                            <span className='text-gray-700'>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                            <Contact className='w-5 h-5 text-green-600' />
                            <span className='text-gray-700'>{user?.phoneNumber || 'No phone number'}</span>
                        </div>
                    </div>

                    <div className='mt-8'>
                        <div className='flex items-center gap-2 mb-4'>
                            <User className='w-5 h-5 text-purple-600' />
                            <h2 className='font-semibold text-lg text-gray-900'>Skills</h2>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {
                                user?.profile?.skills && user?.profile?.skills.length > 0 ?
                                    user?.profile?.skills.map((item, index) => (
                                        <Badge key={index} className='bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors'>
                                            {item}
                                        </Badge>
                                    )) :
                                    <span className='text-gray-500 italic'>No skills added yet</span>
                            }
                        </div>
                    </div>

                    <div className='mt-8'>
                        <div className='flex items-center gap-2 mb-4'>
                            <FileText className='w-5 h-5 text-orange-600' />
                            <Label className="text-lg font-semibold text-gray-900">Resume</Label>
                        </div>
                        {
                            isResume && user?.profile?.resume ? (
                                <a
                                    target='blank'
                                    href={user?.profile?.resume}
                                    className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline cursor-pointer p-3 bg-blue-50 rounded-lg transition-colors'
                                >
                                    <FileText className='w-4 h-4' />
                                    {user?.profile?.resumeOriginalName}
                                </a>
                            ) : (
                                <span className='text-gray-500 italic'>No resume uploaded</span>
                            )
                        }
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className='bg-white border border-gray-200 rounded-2xl shadow-lg p-8'>
                    <div className='flex items-center gap-2 mb-6'>
                        <Briefcase className='w-6 h-6 text-blue-600' />
                        <h1 className='font-bold text-xl text-gray-900'>Applied Jobs</h1>
                    </div>
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
            <Footer />
        </div>
    )
}

export default Profile;