import React, { useState, useEffect } from 'react';
import Navbar from '../components/shared/Navbar';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Loader2 } from 'lucide-react';
import { JOB_API_END_POINT } from '@/utils/constants';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import useGetJobById from '@/hooks/useGetJobByID';
import { useSelector } from 'react-redux';

const JobSetup = () => {
  const params = useParams();
  const navigate = useNavigate();

  useGetJobById(params.id);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
  });

  const { singleJob } = useSelector((store) => store.job);

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements?.join(", ") || "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        experience: singleJob.experienceLevel || "",
        position: singleJob.position || 0,
      });
    }
  }, [singleJob]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update job.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10">
        <form onSubmit={submitHandler} className="p-8 border border-gray-200 shadow-lg rounded-md">
          <h1 className="font-bold text-xl mb-5">Edit Job</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Enter job title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter job description"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="Enter job requirements"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="Enter salary"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Enter location"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Enter job type"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="Enter experience level"
              />
            </div>
            <div>
              <Label>Number of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Enter number of positions"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait </Button>
          ) : (
            <Button type="submit" className="w-full my-4"> Update Job </Button>
          )}
        </form>
      </div>
    </div>
  )
}

export default JobSetup;