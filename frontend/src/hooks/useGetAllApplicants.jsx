import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import { setAllApplicants } from '@/redux/applicationSlice';

const useGetAllApplicants = (jobId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/applicants/${jobId}`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        if (jobId) fetchAllApplicants();
    }, []);
};

export default useGetAllApplicants;


