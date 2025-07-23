import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, Building2 } from 'lucide-react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = (currentTime - createdAt);

        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    // Function to truncate text
    const truncateText = (text, maxLength = 120) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <>
            <div
                onClick={() => navigate(`/description/${job?._id}`)}
                className='group p-6 rounded-lg shadow-lg border border-gray-200 cursor-pointer hover:shadow-2xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1'
            >
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-2 text-sm text-gray-500'>
                        <Clock className='w-4 h-4' />
                        <span>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</span>
                    </div>
                    <Button variant="outline" className="rounded-full hover:bg-blue-50" size="icon"><Bookmark /></Button>
                </div>

                {/* Company Info */}
                <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-start gap-3'>
                        <Avatar className="bg-white">
                            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} className=" w-12 h-12 rounded-full object-cover" />
                        </Avatar>
                        <div>
                            <h3 className='font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>
                                {job?.company?.name}
                            </h3>
                            <div className='flex items-center gap-1 text-sm text-gray-500'>
                                <MapPin className='w-4 h-4' />
                                <span>India</span>
                            </div>
                        </div>
                    </div>
                    <Badge
                        className={`px-3 py-1 text-xs font-medium ${job?.jobType === 'Full-time'
                            ? 'bg-green-100 text-green-700'
                            : job?.jobType === 'Intern'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                    >
                        {job?.jobType}
                    </Badge>
                </div>

                {/* Job Title, Description and tags*/}
                <h2 className='font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2'>{job?.title}</h2>
                <p className='text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3'>{truncateText(job?.description)}</p>
                <div className='flex flex-wrap gap-2 mb-4'>
                    <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs font-medium' variant="secondary">{job?.position} Positions</Badge>
                    <Badge className='bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-xs font-medium' variant="secondary">{job?.jobType}</Badge>
                    <Badge className='bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-xs font-medium' variant="secondary">
                        {job?.salary} {job?.jobType === "Full-time" ? "LPA" : "LPM"}
                    </Badge>
                </div>

                {/* Action Buttons */}
                <div className='flex items-center gap-3 pt-4 border-t border-gray-100'>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/description/${job?._id}`);
                        }}
                        variant="outline"
                        className="flex-1 hover:bg-gray-50 transition-colors"
                    >
                        View Details
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            // todo: Save for later functionality
                        }}
                        className="flex-1 gradient2 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                        Save for later
                    </Button>
                </div>
            </div >
        </>
    )
}

export default Job;