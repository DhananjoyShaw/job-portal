import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import CategoryCarousel from './CategoryCarousel';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='flex flex-col'>
            <div className='relative py-8 md:py-18 dotted-background-cyan mt-20'>
                <div className='max-w-4xl mx-auto text-center'>
                    <span className='mx-auto px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium border border-white/20'>
                        No. 1 Job Hunt Website
                    </span>
                    <div className='mt-1.5'>
                        <h1 className='text-5xl md:text-7xl pt-6 gradient-title2'>
                            Search, Apply & <br />
                            Get Your <span>Dream Jobs</span>
                        </h1>
                        <p className='text-xl md:text-lg text-gray-300 max-w-2xl mx-auto pt-1'>
                            Discover thousands of job opportunities with all the information you need.
                        </p>
                    </div>

                    <div className='flex w-full max-w-3xl mx-auto shadow-2xl border border-white/20 pl-6 py-2 rounded-full items-center mt-12 bg-white/10 backdrop-blur-sm'>
                        <input
                            type="text"
                            placeholder='Find your dream jobs...'
                            className='outline-none border-none w-full bg-transparent text-white placeholder-gray-400 text-lg'
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="rounded-full gradient2 hover:opacity-80 transition-all duration-300 mr-1"
                        >
                            <Search />
                        </Button>
                    </div>

                    {/* CategoryCarousel  */}
                    <div className='mt-7'>
                        <CategoryCarousel />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;