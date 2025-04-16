import { Course } from "../models/course.model.js";

export const createCourse = async (req, res) =>{
    try {
        const {courseTitle, category} = req.body;
        if(!courseTitle && !category) {
            return res.status(400).json({
                message:"Course title and category are required"
            })
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator:req.id
        });

        return res.status(201).json({
            course,
            message:"Course created"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to create course!"
        })
    }
}

export const getcreatorCourses = async (req, res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({creator:userId})
        if(!courses) {
            return res.status(400).json({
                courses:[],
                message:"Course title and category are required"
            })
        }

        return res.status(200).json({
            courses,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to fetch course!"
        })
    }
}