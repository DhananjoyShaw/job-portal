import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { deleteJob } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const filteredJobs = (allAdminJobs || []).filter(job => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    const handleDeleteJob = async (jobId) => {
        try {
            const response = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
                withCredentials: true
            });

            if (response.data.success) {
                dispatch(deleteJob(jobId));
            } else {
                console.error('Failed to delete job:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting job:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="overflow-hidden">
            <Table>
                <TableCaption className="text-gray-600 font-medium mb-4">A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow className="border-b-2 border-gray-100 hover:bg-gray-50/50">
                        <TableHead className="font-semibold text-gray-700 py-4">Company Name</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Role</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Date</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700 py-4">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                            <MoreHorizontal className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <span className="font-medium">No jobs found</span>
                                        <span className="text-sm">Try adjusting your search criteria</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filterJobs?.map((job) => (
                                <TableRow key={job._id} className="hover:bg-gray-50/80 transition-colors duration-200 border-b border-gray-100">
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="bg-white">
                                                <AvatarImage src={job?.company?.logo} alt={job?.company?.name} className=" w-8 h-8 rounded-full object-cover" />
                                            </Avatar>
                                            <div className="font-medium text-gray-900">{job?.company?.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="font-medium text-gray-900">{job?.title}</div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="text-gray-600">{job?.createdAt.split("T")[0]}</div>
                                    </TableCell>
                                    <TableCell className="text-right py-4">
                                        <Popover>
                                            <PopoverTrigger>
                                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                                                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40 p-2">
                                                <div
                                                    onClick={() => navigate(`/admin/job/${job._id}`)}
                                                    className='flex items-center gap-3 w-full cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'
                                                >
                                                    <Edit2 className='w-4 h-4 text-blue-600' />
                                                    <span className="text-sm font-medium text-gray-700">Edit</span>
                                                </div>
                                                <div
                                                    onClick={() => navigate(`/admin/job/applicants/${job._id}`)}
                                                    className='flex items-center gap-3 w-full cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 mt-1'
                                                >
                                                    <Eye className='w-4 h-4 text-green-600' />
                                                    <span className="text-sm font-medium text-gray-700">Applicants</span>
                                                </div>
                                                <div
                                                    onClick={() => handleDeleteJob(job?._id)}
                                                    className='flex items-center gap-3 w-full cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 mt-1'
                                                >
                                                    <Trash2 className='w-4 h-4 text-red-600' />
                                                    <span className="text-sm font-medium text-gray-700">Delete</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable;

