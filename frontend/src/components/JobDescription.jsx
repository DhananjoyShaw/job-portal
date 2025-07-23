import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import Navbar from './shared/Navbar';
import { toast } from 'sonner';
import useGetJobById from '@/hooks/useGetJobByID';
import { Briefcase, MapPin, Calendar, DollarSign, Users, Clock, Building2 } from 'lucide-react';
import Footer from './shared/Footer';

const JobDescription = () => {
    const { user } = useSelector(store => store.auth);
    const { singleJob } = useSelector(store => store.job);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    useGetJobById(jobId);

    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps in updating the UI data in realtime
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        setIsApplied(singleJob?.applications?.some(application => application.applicant === user?._id));
    }, [singleJob, user?._id])

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto min-h-screen px-4 py-16 mt-10'>
                <div className='max-w-7xl mx-auto'>
                    <div className='bg-white border border-gray-200 rounded-xl shadow-lg p-8'>
                        <div className='flex items-start justify-between mb-6'>
                            <div className='flex-1'>
                                <div className='flex items-center gap-3 mb-4'>
                                    <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
                                        <Building2 className='w-6 h-6 text-white' />
                                    </div>
                                    <div>
                                        <h1 className='font-bold text-2xl text-gray-900'>{singleJob?.title}</h1>
                                        <p className='text-gray-600'>{singleJob?.company?.name}</p>
                                    </div>
                                </div>

                                <div className='flex flex-wrap gap-2 mb-5'>
                                    <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors' variant="secondary">{singleJob?.position} Positions</Badge>
                                    <Badge className='bg-green-50 text-green-700 hover:bg-green-100 transition-colors' variant="secondary">{singleJob?.jobType}</Badge>
                                </div>
                            </div>

                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`px-8 py-3 rounded-lg font-medium ${isApplied
                                    ? 'bg-gray-600 cursor-not-allowed text-white'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                                    }`}
                            >
                                {isApplied ? 'Already Applied' : 'Apply Now'}
                            </Button>
                        </div>

                        <div className='border-t border-gray-200 pt-4'>
                            <h2 className='font-bold text-xl text-gray-900 mb-6 flex items-center gap-2'>
                                <Briefcase className='w-5 h-5 text-blue-600' />
                                Job Details
                            </h2>
                            <div className='grid md:grid-cols-2 gap-6'>
                                <div className='space-y-5'>
                                    <div className='flex items-center gap-3'>
                                        <Briefcase className='w-5 h-5 text-gray-400' />
                                        <div>
                                            <span className='text-sm text-gray-500'>Role</span>
                                            <p className='font-medium text-gray-900'>{singleJob?.title}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <MapPin className='w-5 h-5 text-gray-400' />
                                        <div>
                                            <span className='text-sm text-gray-500'>Location</span>
                                            <p className='font-medium text-gray-900'>{singleJob?.location}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <DollarSign className='w-5 h-5 text-gray-400' />
                                        <div>
                                            <span className='text-sm text-gray-500'>Salary</span>
                                            <p className='font-medium text-gray-900'>{singleJob?.salary} {singleJob?.jobType === "Full-time" ? "LPA" : "LPM"}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <Clock className='w-5 h-5 text-gray-400' />
                                        <div>
                                            <span className='text-sm text-gray-500'>Experience</span>
                                            <p className='font-medium text-gray-900'>{singleJob?.experienceLevel} years</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='space-y-5'>
                                    <div className='flex items-center gap-3'>
                                        <Users className='w-5 h-5 text-gray-400' />
                                        <div>
                                            <span className='text-sm text-gray-500'>Total Applicants</span>
                                            <p className='font-medium text-gray-900'>{singleJob?.applications?.length || 0}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <Calendar className='w-5 h-5 text-gray-400' />
                                        <div>
                                            <span className='text-sm text-gray-500'>Posted Date</span>
                                            <p className='font-medium text-gray-900'>{singleJob?.createdAt?.split("T")[0]}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <Users className='w-5 h-5 text-gray-400' />
                                        <div>
                                            <span className='text-sm text-gray-500'>Total Positions</span>
                                            <p className='font-medium text-gray-900'>{singleJob?.position}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-8 pt-6 border-t border-gray-200'>
                                <h3 className='font-bold text-lg text-gray-900 mb-4'>Job Description</h3>
                                <p className='text-gray-700 leading-relaxed'>{singleJob?.description}</p>
                                <h3 className='mt-8 font-bold text-lg text-gray-900 mb-4'>Job Requirements</h3>
                                <p className='text-gray-700 leading-relaxed'>{singleJob?.requirements}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default JobDescription;


