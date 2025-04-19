import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLecureMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, {data, isLoading,isSuccess, error}] = useCreateLecureMutation();

  const createLectureHandler = async() => {


    await createLecture({ lectureTitle, courseId})
  };

  useEffect(() => {
    if(isSuccess) {
        toast.success(data.message)
    }
    if(error) {
        toast.error(error.data.message);
    }
  },[])
  return (
    <div className="flex-1 mx-10 m-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl ">
          Lets add Lecture, add some basic lecture details for your new lecture
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, ex?
        </p>
      </div>
      <div className="space-y-4 mb-2">
        <Label>Title</Label>
        <Input
          type="text"
          name="lectureTitle"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          placeholder="Leture Title name"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant={"outline"} onClick={() => navigate(`/admin/course/${courseId}`)}>
          Back to course
        </Button>
        <Button disabled={isLoading} onClick={createLectureHandler}>
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

export default CreateLecture;
