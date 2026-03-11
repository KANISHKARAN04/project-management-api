import {Router} from "express";
import {getTasks,createTasks, getTaskByID, updateTasks, deleteTasks} from "../controllers/task.controllers.js";
import {deleteSubTasks, updateSubTasks, createSubTasks} from "../controllers/subtask.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {createTaskValidator,createSubtaskValidator} from "../validators/index.validators.js";
import{verifyJWT,validateProjectPermission} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router=Router();
router.use(verifyJWT)

//unsecured route
router.route("/:projectId/tasks").get(getTasks);
router.route("/:projectId/tasks").post(createTaskValidator(),validateProjectPermission([UserRolesEnum.ADMIN]),validate,createTasks);
router.route("/:projectId/tasks/:taskId").get(validateProjectPermission(AvailableUserRole),getTaskByID);
router.route("/:projectId/tasks/:taskId").put(validateProjectPermission([UserRolesEnum.ADMIN]),validate,updateTasks);
router.route("/:projectId/tasks/:taskId").delete(validateProjectPermission([UserRolesEnum.ADMIN]),deleteTasks);
router.route("/:projectId/tasks/:taskId/st/:subTaskId").delete(validateProjectPermission([UserRolesEnum.ADMIN]),deleteSubTasks);
router.route("/:projectId/tasks/:taskId/st/:subTaskId").put(validateProjectPermission([UserRolesEnum.ADMIN]),validate,updateSubTasks);
router.route("/:projectId/tasks/:taskId/st").post(createSubtaskValidator(),validateProjectPermission([UserRolesEnum.ADMIN,UserRolesEnum.PROJECT_ADMIN]),validate,createSubTasks);

export default router;