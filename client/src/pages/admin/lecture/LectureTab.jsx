import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const MEDIA_API = "http://localhost:8081/api/v1/media/";
const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;
  const navigate = useNavigate();

  const {data:lectureData, } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(()=>{
    if(lecture){
        setLectureTitle(lecture.lectureTitle);
        setIsFree(lecture.isPreviewFree);
        setUploadVideoInfo(lecture.videoInfo);
    }
  },[lecture])

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setButtonDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video Upload Failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      navigate(`/admin/course/${courseId}/lecture`)
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message || "lecture removed successfully");
      navigate("/admin/course/courseId/lecture")
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [removeSuccess]);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="cursor-pointer"
            variant="destructive"
            onClick={removeLectureHandler}
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait!
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        <div className="my-5 space-y-2">
          <Label>
            Video<span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            placeholder="Ex. Introduction to Javascript"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch id="airplane-mode" checked={isFree} onCheckedChange={setIsFree} className="cursor-pointer" />
          <Label htmlFor="airplane-mode">Is this video free?</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="mt-4">
          <Button disabled={isLoading} className="cursor-pointer" onClick={editLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait!
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
