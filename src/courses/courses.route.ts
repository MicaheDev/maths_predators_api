import { Router } from "express";
import { CoursesController } from "./courses.controller";

const router = Router();

router.get("/courses", CoursesController.handleGetCourses);
router.get("/courses/:partParam", CoursesController.handleGetCoursesByPart);

export { router as coursesRouter };
