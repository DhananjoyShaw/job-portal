import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "FullStack Developer",
    "DevOps Engineer",
    "UI/UX Designer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="w-full max-w-4xl mx-auto overflow-hidden">
            <motion.div
                className="flex gap-4"
                animate={{ x: [0, -1000], }}
                transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear", }, }}
            >
                {
                    [...category, ...category].map((cat, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="rounded-full bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 whitespace-nowrap"
                            >
                                {cat}
                            </Button>
                        </motion.div>
                    ))
                }
            </motion.div>
        </div>
    )
}

export default CategoryCarousel;
