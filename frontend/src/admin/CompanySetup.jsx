import React, { useEffect, useState } from 'react'
import Navbar from '../components/shared/Navbar'
import { Button } from '../components/ui/button'
import { Loader2, Building2 } from 'lucide-react'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyByID'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id); // Fetch company data by ID and store it in singleCompany state in Redux

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const { singleCompany } = useSelector(store => store.company);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-16 mt-10'>
                <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-8'>
                    <div className='flex items-center gap-3 mb-8'>
                        <Building2 className='w-6 h-6 text-blue-600' />
                        <h1 className='text-2xl font-bold text-gray-900'>Company Setup</h1>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <Label className="text-sm font-medium text-gray-700">Company Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    placeholder="Enter company name"
                                    onChange={changeEventHandler}
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="text-sm font-medium text-gray-700">Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    placeholder="Enter company description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="text-sm font-medium text-gray-700">Website</Label>
                                <Input
                                    type="text"
                                    name="website"
                                    placeholder="Enter company website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="text-sm font-medium text-gray-700">Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    placeholder="Enter company location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className='space-y-2 md:col-span-2'>
                                <Label className="text-sm font-medium text-gray-700">Company Logo</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    placeholder="Upload company logo"
                                    onChange={changeFileHandler}
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className='mt-8'>
                            {
                                loading ? (
                                    <Button disabled className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Updating...
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                                    >
                                        Update Company
                                    </Button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup;