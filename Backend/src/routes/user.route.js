import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/get-profile",authUser, getUserProfile);
userRouter.post("/edit-user",authUser, updateUserProfile);



export default userRouter;
