import {Router} from "express";
import {deleteNotes, updateNotes, createNote,listNotes, getNoteDetails} from "../controllers/note.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {createTaskValidator,createSubtaskValidator,createNoteValidator} from "../validators/index.validators.js";
import{verifyJWT,validateProjectPermission} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router=Router();
router.use(verifyJWT)

router.route("/:projectId/note").get(validateProjectPermission(AvailableUserRole),listNotes);
router.route("/:projectId/note").post(createNoteValidator(),validateProjectPermission([UserRolesEnum.ADMIN]),validate,createNote);
router.route("/:projectId/note/:noteId").get(validateProjectPermission(AvailableUserRole),getNoteDetails);
router.route("/:projectId/note/:noteId").put(validateProjectPermission([UserRolesEnum.ADMIN,UserRolesEnum.PROJECT_ADMIN]),validate,updateNotes);
router.route("/:projectId/note/:noteId").delete(validateProjectPermission([UserRolesEnum.ADMIN,UserRolesEnum.PROJECT_ADMIN]),deleteNotes);

export default router;