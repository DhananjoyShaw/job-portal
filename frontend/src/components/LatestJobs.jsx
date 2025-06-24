import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);

    return (
        <div className='max-w-7xl mx-auto px-4 py-16'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
                    <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                        Latest & Top
                    </span>{' '}
                    Job Openings
                </h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Discover the most recent job opportunities from top companies
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    allJobs.length === 0 ? (
                        <div className='col-span-full text-center py-12'>
                            <div className='text-gray-500 text-lg'>
                                <div className='w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center'>
                                    <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6' />
                                    </svg>
                                </div>
                                <p>No jobs available at the moment</p>
                                <p className='text-sm text-gray-400 mt-1'>Check back later for new opportunities</p>
                            </div>
                        </div>
                    ) : (
                        allJobs?.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs;