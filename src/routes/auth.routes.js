import {Router} from "express";
import {registerUser,login, logoutUser, verifyEmail, refreshAccessToken, forgotPasswordRequest, resetPassword, getCurrentUser, changePassword, resendEmailVerification} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {userLoginValidator, userRegisterValidator,userForgotPasswordValidator,userResetPasswordValidator,userChangePasswordValidator} from "../validators/index.validators.js";
import{verifyJWT} from "../middlewares/auth.middleware.js";

const router=Router();

//unsecured route
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(),validate,login);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(userForgotPasswordValidator(),validate,forgotPasswordRequest);
router.route("/reset-password/:resetToken").post(userResetPasswordValidator(),validate,resetPassword);

//secure route
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/current-user").get(verifyJWT,getCurrentUser);
router.route("/change-password").post(verifyJWT,userChangePasswordValidator(),validate,changePassword);
router.route("/resend-email-verification").post(verifyJWT,resendEmailVerification);

export default router;