import {body} from "express-validator";

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


export {
    userRegisterValidator,
    userLoginValidator,
    userForgotPasswordValidator,
    userResetPasswordValidator,
    userChangePasswordValidator
}