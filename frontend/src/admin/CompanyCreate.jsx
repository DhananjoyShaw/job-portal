import React, { useState } from 'react'
import Navbar from '../components/shared/Navbar'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2 } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-16 mt-10'>
                <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-8'>
                    <div className='flex items-center gap-3 mb-8'>
                        <Building2 className='w-6 h-6 text-blue-600' />
                        <h1 className='text-2xl font-bold text-gray-900'>Create New Company</h1>
                    </div>

                    <div className='mb-8'>
                        <h2 className='font-semibold text-lg text-gray-900 mb-2'>Company Name</h2>
                        <p className='text-gray-600'>What would you like to name your company? You can change this later.</p>
                    </div>

                    <div className='space-y-4'>
                        <div>
                            <Label className="text-sm font-medium text-gray-700">Company Name</Label>
                            <Input
                                type="text"
                                className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Enter company name"
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>

                        <div className='flex items-center gap-3 pt-4'>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/admin/companies")}
                                className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={registerNewCompany}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2"
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate;