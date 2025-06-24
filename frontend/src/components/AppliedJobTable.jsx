import React from 'react'
import { Table, TableCaption, TableCell, TableHead, TableRow, TableBody, TableHeader } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { Briefcase, Calendar, Building2 } from 'lucide-react'

const AppliedJobTable = () => {
    /* Providing allAppliedJobs = [] as a fallback ensures the component doesn't break if store.job or store.job.allAppliedJobs is undefined during rendering. */
    const { allAppliedJobs = [] } = useSelector(store => store.job);

    return (
        <div className="overflow-hidden">
            <Table>
                <TableCaption className="text-gray-600 font-medium mb-4">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow className="border-b-2 border-gray-100 hover:bg-gray-50/50">
                        <TableHead className="font-semibold text-gray-700 py-4">Date Applied</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Job Role</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Company</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700 py-4">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-12 text-gray-500">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Briefcase className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-semibold text-gray-900 mb-1">No applications yet</h3>
                                            <p className="text-sm text-gray-600">Start applying to jobs and track your applications here</p>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id} className="hover:bg-gray-50/80 transition-colors duration-200 border-b border-gray-100">
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">{appliedJob?.createdAt?.split("T")[0]}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="font-medium text-gray-900">{appliedJob.job?.title}</div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-700">{appliedJob.job?.company?.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right py-4">
                                        <Badge className={`${appliedJob?.status === "rejected"
                                            ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                            : appliedJob.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                                            } font-medium px-3 py-1`}>
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable;