import express from "express";
import {
  handleUserSignup,
  handleUserLogin,
  handleUserLogout,
    handleAdminLogin,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/login", handleUserLogin);
authRoutes.post("/admin/login", handleAdminLogin);
authRoutes.post("/signup", handleUserSignup);
authRoutes.post("/logout", handleUserLogout);


export default authRoutes;