import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { MoreHorizontal, Users, FileText, CheckCircle, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/update/${id}`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="overflow-hidden">
            <Table>
                <TableCaption className="text-gray-600 font-medium mb-4">A list of applicants for this position</TableCaption>
                <TableHeader>
                    <TableRow className="border-b-2 border-gray-100 hover:bg-gray-50/50">
                        <TableHead className="font-semibold text-gray-700 py-4">Full Name</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Email</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Contact</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Resume</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Date</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700 py-4">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.length > 0 ? (
                            applicants?.applications?.map((item) => (
                                <TableRow key={item._id} className="hover:bg-gray-50/80 transition-colors duration-200 border-b border-gray-100">
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Users className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <span className="font-medium text-gray-900">{item?.applicant?.fullname}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-gray-700">{item?.applicant?.email}</TableCell>
                                    <TableCell className="py-4 text-gray-700">{item?.applicant?.phoneNumber}</TableCell>
                                    <TableCell className="py-4">
                                        {
                                            item.applicant?.profile?.resume ? (
                                                <a
                                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                                    href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    {item?.applicant?.profile?.resumeOriginalName}
                                                </a>
                                            ) : (<span className="text-gray-500">Not available</span>)
                                        }
                                    </TableCell>
                                    <TableCell className="py-4 text-gray-700">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right py-4">
                                        <Popover>
                                            <PopoverTrigger>
                                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full gradient3">
                                                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40 p-2">
                                                {
                                                    shortlistingStatus.map((currStatus, index) => (
                                                        <div
                                                            onClick={() => statusHandler(currStatus, item?._id)}
                                                            key={index}
                                                            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg gradient3"
                                                        >
                                                            {
                                                                currStatus === "Accepted" ? (
                                                                    <CheckCircle className='w-4 h-4 text-green-600' />
                                                                ) : (<XCircle className='w-4 h-4 text-red-600' />)
                                                            }
                                                            <span className="text-sm font-medium text-gray-700">{currStatus}</span>
                                                        </div>
                                                    ))
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Users className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-semibold text-gray-900 mb-1">No applicants yet</h3>
                                            <p className="text-sm text-gray-600">Applications will appear here once candidates apply for this position</p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;