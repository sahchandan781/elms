import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();


  const [createCourse, {data, error, isSuccess, isLoading}] = useCreateCourseMutation();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({courseTitle, category})
    
    
  };

  // for dispalying toast
  useEffect(() => {
    if(isSuccess) {
      toast.success(data?.message || "Course created!");
      navigate("/admin/course")
    }
  }, [isSuccess, error])
  
  return (
    <div className="flex-1 mx-10 m-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl ">
          Lets add course, add some basic course detail for your new course
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, ex?
        </p>
      </div>
      <div className="space-y-4 mb-2">
        <Label>Title</Label>
        <Input 
        type="text" 
        name="courseTitle"
        value={courseTitle} 
        onChange={(e) => setCourseTitle(e.target.value)}
        placeholder="Your course name" />
      </div>
      <div className="space-y-4 mb-2">
        <Label>Category</Label>
        <Select onValueChange={getSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="Next JS">Next JS</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="FrontEnd Development">FrontEnd Development</SelectItem>
              <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
              <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
              <SelectItem value="Javascript">Javascript</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="Docker">Docker</SelectItem>
              <SelectItem value="MongoDB">MongoDB</SelectItem>
              <SelectItem value="HTML">HTML</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button variant={"outline"} onClick={() => navigate("/admin/course")}>
          Back
        </Button>
        <Button disabled={isLoading} onClick={createCourseHandler}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddCourse;
