import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.model.js";

export const getCourseProgress = async(req, res) => {
    try {
        const {courseId} = req.params;
        const userId = req.id;

        // step-1 fetch the user course progress
        let courseProgress = await CourseProgress.findOne({courseId, userId}).populate("courseId")

        const courseDetails = await Course.findById(courseId);

        if(!courseDetails) {
            return res.status(404).json({
                message:"Course Not Found!"
            })
        }

        // step-2 if no progress found return course detail with empty progress
        if(!courseProgress) {
            return res.status(200).json({
                courseDetails,
                lectureProgress:[],
                completed: false
            })
        }

        // step-3 Return the user course progress along with the course detail
        return res.status(200).json({
            courseDetails,
            progress:courseProgress.lectureProgress,
            completed: courseProgress.completed
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const updateLectureprogress = async(req, res) => {
    try {
        const {courseId, lectureId} = req.params;
        const userId = req.id;

        // fetch or create  course progress
        let courseProgress = await CourseProgress.findOne({courseId, userId})

        if(!courseProgress){
            // if no progress found create a new record
            courseProgress = await new CourseProgress.create({
                userId, courseId,
                completed:false,
                lectureProgress:[]
            })
        }

        // find the lecture progress in course progress
        const lectureIndex = courseProgress.lectureProgress.findIndex((lecture) => lecture.lectureId ===lectureId);

        if(!lectureIndex !== -1){
            // if lectureProgress already exist, update its status
            courseProgress.lectureProgress[lectureIndex].viewed = true; 

        } else {
            // add new lecture progress
            courseProgress.lectureProgress.push({
                lectureId, viewed: true,
            })
        }

        // if all lecture is completed

        const lectureProgressLength = courseProgress.lectureProgress.filter((lectureProg) => lectureProg.viewed).length

        const course = await Course.findById(courseId);

        if(course.lectures.length === lectureProgressLength){
            courseProgress.completed = true;
        }

        await courseProgress.save();

        return res.status(200).json({
            message:"Lecture progress updated successfully"
        })

    } catch (error) {
        console.log(error);
        
    }
}

export const markAsCompleted = async(req, res) => {
    try {
        const {courseId} = req.params;
        const userId = req.id;

        const courseProgress = await CourseProgress.findOne(courseId, userId);
        if(!courseProgress) {
            return res.status(404).json({
                message: "CourseProgress not found"
            })
        }

        courseProgress.lectureProgress.map((lectureProg) => lectureProg.viewed = true);

        courseProgress.completed = true;

        await courseProgress.save();

        return res.status(200).json({
            message:"Course marked as completed"
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const markAsInCompleted = async(req, res) => {
    try {
        const {courseId} = req.params;
        const userId = req.id;

        const courseProgress = await CourseProgress.findOne(courseId, userId);
        if(!courseProgress) {
            return res.status(404).json({
                message: "CourseProgress not found"
            })
        }

        courseProgress.lectureProgress.map((lectureProg) => lectureProg.viewed = false);

        courseProgress.completed = false;

        await courseProgress.save();

        return res.status(200).json({
            message:"Course marked as Incomplete"
        })
    } catch (error) {
        console.log(error);
        
    }
}