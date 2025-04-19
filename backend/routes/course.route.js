import express from 'express';
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { createCourse, createLecture, editCourse, getCourseById, getcreatorCourses } from "../controllers/course.controller.js"
import upload from "../utils/multer.js"

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getcreatorCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);


export default router;