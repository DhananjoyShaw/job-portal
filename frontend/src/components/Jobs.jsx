import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import Footer from './shared/Footer';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery])

    return (
        <div>
            <Navbar />
            <div className="max-w-8xl min-h-screen mx-auto px-4 py-16 mt-10">
                <div className="flex gap-5">
                    <div className="w-[23%]">
                        <FilterCard />
                    </div>
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                        {
                            filterJobs.length === 0 ? (
                                <div className="text-center mt-10">
                                    <span className="text-gray-500">Job not found</span>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-4">
                                    {
                                        filterJobs.map((job) => (
                                            <div key={job?._id}>
                                                <Job job={job} />
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Jobs;