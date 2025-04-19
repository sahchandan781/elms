import express from 'express';
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { createCourse, createLecture, editCourse, getCourseById, getCourseLecture, getcreatorCourses } from "../controllers/course.controller.js"
import upload from "../utils/multer.js"

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getcreatorCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);


export default router;