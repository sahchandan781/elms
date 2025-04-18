import express from 'express';
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { createCourse, editCourse, getcreatorCourses } from "../controllers/course.controller.js"
import upload from "../utils/multer.js"

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getcreatorCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"), editCourse);


export default router;