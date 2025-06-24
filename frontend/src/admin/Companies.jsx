import React, { useEffect, useState } from 'react'
import Navbar from '@/components/shared/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { Search, Plus, Building2 } from 'lucide-react';
import Footer from '@/components/shared/Footer';

const Companies = () => {
    useGetAllCompanies();

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl min-h-screen mx-auto px-4 py-16 mt-10'>
                <div className='mb-8'>
                    <div className='flex items-center gap-3 mb-2'>
                        <Building2 className='w-6 h-6 text-blue-600' />
                        <h1 className='text-3xl font-bold text-gray-900'>Manage Companies</h1>
                    </div>
                    <p className='text-gray-600'>Create and manage company profiles</p>
                </div>

                <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-6'>
                    <div className='flex items-center justify-between mb-6'>
                        <div className='relative'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                            <Input
                                className="w-80 pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Filter by name"
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={() => navigate("/admin/companies/create")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Plus className='w-4 h-4' />
                            New Company
                        </Button>
                    </div>

                    <CompaniesTable />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Companies;