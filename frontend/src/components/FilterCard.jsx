import React, { useState, useEffect } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Filter, MapPin, Briefcase, DollarSign, X } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        icon: MapPin,
        array: ["Bangalore", "Noida", "Hyderabad", "Pune", "Mumbai", "Delhi", "Chennai", "Gurgaon"]
    },
    {
        filterType: "Job Type",
        icon: Briefcase,
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Data Analyst", "DevOps Engineer", "UI/UX Designer", "Product Manager"]
    },
    {
        filterType: "Salary Range",
        icon: DollarSign,
        array: ["0-5 Lakh", "5-10 Lakh", "10-20 Lakh", "20-30 Lakh", "30+ Lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [activeFilters, setActiveFilters] = useState([]);
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
        if (value && !activeFilters.includes(value)) {
            setActiveFilters([...activeFilters, value]);
        }
    }

    const removeFilter = (filterToRemove) => {
        const newFilters = activeFilters.filter(filter => filter !== filterToRemove);
        setActiveFilters(newFilters);
        if (selectedValue === filterToRemove) {
            setSelectedValue('');
            dispatch(setSearchedQuery(''));
        }
    }

    const clearAllFilters = () => {
        setActiveFilters([]);
        setSelectedValue('');
        dispatch(setSearchedQuery(''));
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white border border-gray-200 rounded-xl shadow-sm p-6'>
            {/* Header */}
            <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                    <Filter className='w-5 h-5 text-blue-600' />
                </div>
                <div>
                    <h2 className='font-bold text-xl text-gray-900'>Filter Jobs</h2>
                    <p className='text-sm text-gray-600'>Refine your search results</p>
                </div>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
                <div className='mb-6'>
                    <div className='flex items-center justify-between mb-3'>
                        <span className='text-sm font-medium text-gray-700'>Active Filters</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className='text-red-600 hover:text-red-700 hover:bg-red-50 text-xs'
                        >
                            Clear All
                        </Button>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {activeFilters.map((filter, index) => (
                            <div
                                key={index}
                                className='flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium'
                            >
                                <span>{filter}</span>
                                <button
                                    onClick={() => removeFilter(filter)}
                                    className='hover:bg-blue-100 rounded-full p-0.5 transition-colors'
                                >
                                    <X className='w-3 h-3' />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Filter Sections */}
            <div className='space-y-6'>
                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                    {filterData.map((data, index) => {
                        const IconComponent = data.icon;
                        return (
                            <div key={index} className='border-b border-gray-100 pb-6 last:border-b-0'>
                                <div className='flex items-center gap-2 mb-4'>
                                    <IconComponent className='w-4 h-4 text-gray-500' />
                                    <h3 className='font-semibold text-gray-900'>{data.filterType}</h3>
                                </div>
                                <div className='space-y-3'>
                                    {data.array.map((item, idx) => {
                                        const itemId = `${data.filterType}-${idx}`;
                                        return (
                                            <div key={itemId} className='flex items-center space-x-3'>
                                                <RadioGroupItem
                                                    value={item}
                                                    id={itemId}
                                                    className='border-gray-300 text-blue-600 focus:ring-blue-500'
                                                />
                                                <Label
                                                    htmlFor={itemId}
                                                    className='text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors'
                                                >
                                                    {item}
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </RadioGroup>
            </div>

            {/* Results Count */}
            {selectedValue && (
                <div className='mt-6 pt-4 border-t border-gray-100'>
                    <div className='text-center'>
                        <span className='text-sm text-gray-600'>
                            Showing results for: <span className='font-medium text-gray-900'>{selectedValue}</span>
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterCard;