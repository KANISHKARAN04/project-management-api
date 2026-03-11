import {body} from "express-validator";
import {AvailableUserRole} from "../utils/constants.js";
const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is Invalid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lowercase")
            .isLength({min:3})
            .withMessage("Username must be atleast 3 characters long"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
        body("fullName")
            .optional()
            .trim()
    ]
}

const userLoginValidator =()=>{
    return [
        body("email")
            .optional()
            .isEmail()
            .withMessage("Email is Invalid"),
        body("password")
            .notEmpty()
            .withMessage("Password is required"),
    ]
}

const userChangePasswordValidator = ()=>{
    return [
        body("oldPassword")
            .notEmpty()
            .withMessage("Old Passowrd is required"),
        body("newPassword")
            .notEmpty()
            .withMessage("New Passowrd is required"),
    ]
}

const userForgotPasswordValidator =()=>{
    return [
        body("email")
            .notEmpty()
            .withMessage("Old Passowrd is required")
            .isEmail()
            .withMessage("Email is invalid")
    ]
}

const userResetPasswordValidator =()=>{
    return [
        body("newPassword")
            .notEmpty()
            .withMessage("Passowrd is required")
    ]
}

const createProjectValidator = ()=>{
    return [
        body("name")
            .notEmpty()
            .withMessage("Name is required"),
        body("description").optional(),
    ];
};

const addMembertoProjectValidator=()=>{
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        body("role")
            .notEmpty()
            .withMessage("Role is required")
            .isIn(AvailableUserRole)
            .withMessage("Role is invalid")
    ];
}

export const createSubtaskValidator = () => {
 return [
  body("title")
   .trim()
   .notEmpty()
   .withMessage("Subtask title is required"),

  body("isCompleted")
   .optional()
   .isBoolean()
   .withMessage("isCompleted must be boolean")
 ];
};

export const createTaskValidator = () => {
 return [
  body("title")
   .trim()
   .notEmpty()
   .withMessage("Title is required"),

  body("description")
   .optional()
   .isString()
   .withMessage("Description must be string")
 ];
};

export const createNoteValidator = () => {
 return [
  body("content")
   .trim()
   .notEmpty()
   .withMessage("Content is required"),
 ];
};

export {
    userRegisterValidator,
    userLoginValidator,
    userForgotPasswordValidator,
    userResetPasswordValidator,
    userChangePasswordValidator,
    createProjectValidator,
    addMembertoProjectValidator
}