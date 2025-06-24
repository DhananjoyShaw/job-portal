import React from 'react'
import Navbar from '../components/shared/Navbar'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAllApplicants from '@/hooks/useGetAllApplicants';
import ApplicantsTable from './ApplicantsTable';
import { Users } from 'lucide-react';
import Footer from '@/components/shared/Footer';

const Applicants = () => {
    const params = useParams();
    useGetAllApplicants(params.id);
    const { applicants } = useSelector(store => store.application);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 min-h-screen py-16 mt-10'>
                <div className='mb-8'>
                    <div className='flex items-center gap-3 mb-2'>
                        <Users className='w-6 h-6 text-blue-600' />
                        <h1 className='text-3xl font-bold text-gray-900'>Job Applicants</h1>
                    </div>
                    <p className='text-gray-600'>Manage and review applications for this position</p>
                </div>

                <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-6'>
                    <div className='flex items-center justify-between mb-6'>
                        <div className='flex items-center gap-2'>
                            <span className='text-lg font-semibold text-gray-900'>Applicants</span>
                            <span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full'>
                                {applicants?.applications?.length || 0}
                            </span>
                        </div>
                    </div>

                    <ApplicantsTable />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Applicants;