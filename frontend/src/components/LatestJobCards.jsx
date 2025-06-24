import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    // Function to truncate text
    const truncateText = (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='group p-6 rounded-xl shadow-lg bg-white border border-gray-100 cursor-pointer hover:shadow-2xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1'
        >
            {/* Company Info */}
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-start gap-3'>
                    <Avatar className="bg-white">
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} className=" w-12 h-12 rounded-full object-cover" />
                    </Avatar>
                    <div>
                        <h3 className='font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>{job?.company?.name}</h3>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <MapPin className='w-4 h-4' />
                            <span>India</span>
                        </div>
                    </div>
                </div>
                <Badge
                    className={`px-3 py-1 text-xs font-medium ${job?.jobType === 'Full-time'
                        ? 'bg-green-100 text-green-700'
                        : job?.jobType === 'Part-time'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                >
                    {job?.jobType}
                </Badge>
            </div>

            <h2 className='font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2'>{job?.title}</h2>
            <p className='text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3'>{truncateText(job?.description)}</p>

            {/* Job Details */}
            <div className='space-y-3 mb-4'>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <Clock className='w-4 h-4' />
                    <span>Posted recently</span>
                </div>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap gap-2'>
                <Badge className='bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs font-medium' variant="secondary">
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-xs font-medium' variant="secondary">
                    {job?.jobType}
                </Badge>
                <Badge className='bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-xs font-medium' variant="secondary">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards;