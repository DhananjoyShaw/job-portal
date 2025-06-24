import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Edit2, MoreHorizontal, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompanies = companies.length >= 0 && companies.filter(company => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompanies);
    }, [companies, searchCompanyByText])

    return (
        <div className="overflow-hidden">
            <Table>
                <TableCaption className="text-gray-600 font-medium mb-4">A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow className="border-b-2 border-gray-100 hover:bg-gray-50/50">
                        <TableHead className="font-semibold text-gray-700 py-4">Company Name</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Date</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700 py-4">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Building2 className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <span className="font-medium">No companies registered yet</span>
                                        <span className="text-sm">Create your first company to get started</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filterCompany.map((company) => (
                                <TableRow key={company?._id} className="hover:bg-gray-50/80 transition-colors duration-200 border-b border-gray-100">
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="bg-white">
                                                <AvatarImage src={company?.logo} alt={company?.name} className=" w-8 h-8 rounded-full object-cover" />
                                            </Avatar>
                                            <div className="font-medium text-gray-900">{company?.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="text-gray-600">{company?.createdAt.split("T")[0]}</div>
                                    </TableCell>
                                    <TableCell className="text-right py-4">
                                        <Popover>
                                            <PopoverTrigger>
                                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                                                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40 p-2">
                                                <div
                                                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                    className='flex items-center gap-3 w-full cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'
                                                >
                                                    <Edit2 className='w-4 h-4 text-blue-600' />
                                                    <span className="text-sm font-medium text-gray-700">Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
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

export default CompaniesTable;
