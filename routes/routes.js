import express from "express";
import {
  LoginController,
  SignupController,
  getAllUsers,
  updateUser
} from "../controller/userController.js";


import {BlogController , upload} from "../controller/blogController.js";



import auth from "../middleware/auth.js";


export const router = express.Router();

router.post("/signup", SignupController);
router.post("/login",  LoginController);
router.get("/users", getAllUsers);
router.put("/users/:id", updateUser);
router.get("/comments/:id", BlogController.getAllComment);
router.post("/comments", BlogController.createComment);





router.post("/blog", upload.single("img"), BlogController.create);

router.get("/blogs", BlogController.get);
router.get('/blog/:id', BlogController.getOne);

