import { Router } from "express";
import { CoursesController } from "./courses.controller";

const router = Router();

router.get("/courses", CoursesController.handleGetCourses);
router.get("/courses/search/:searchQuery", CoursesController.handleSearchCourses);

router.get("/courses/:partParam", CoursesController.handleGetCoursesByPart);
router.get("/courses/:partParam/:subPartParam", CoursesController.handleGetCourseBySubPart);
router.get("/courses/:partParam/:subPartParam/:contentPart", CoursesController.handleGetCourseByContentPart);

export { router as coursesRouter };
