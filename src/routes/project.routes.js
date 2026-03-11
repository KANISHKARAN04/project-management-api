import {Router} from "express";
import {getProject,getProjectByID, createProject, deleteMemberByID, updateMemberRole, updateProjectByID, deleteProjectByID, getProjectMembers,addProjectMember} from "../controllers/project.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {createProjectValidator,addMembertoProjectValidator} from "../validators/index.validators.js";
import{verifyJWT,validateProjectPermission} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router=Router();
router.use(verifyJWT)

router.route("/").get(getProject);
router.route("/").post(createProjectValidator(),validate,createProject);
router.route("/:projectId").get(validateProjectPermission(AvailableUserRole),getProjectByID);
router.route("/:projectId").put(validateProjectPermission([UserRolesEnum.ADMIN]),createProjectValidator(),validate,updateProjectByID);
router.route("/:projectId").delete(validateProjectPermission([UserRolesEnum.ADMIN]),deleteProjectByID);
router.route("/:projectId/members").get(getProjectMembers);

router.route("/:projectId/members/:userId").delete(validateProjectPermission([UserRolesEnum.ADMIN]),deleteMemberByID);
router.route("/:projectId/members/:userId").put(validateProjectPermission([UserRolesEnum.ADMIN]),validate,updateMemberRole);
router.route("/:projectId/members").post(validateProjectPermission([UserRolesEnum.ADMIN]),addMembertoProjectValidator(),validate,addProjectMember);

export default router;