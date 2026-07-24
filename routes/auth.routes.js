import express from "express";
import {
  handleUserSignup,
  handleUserLogin,
  handleUserLogout,
    handleAdminLogin,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/login", handleUserLogin);
authRoutes.post("/signup", handleUserSignup);
authRoutes.post("/logout", handleUserLogout);
authRoutes.post("/admin/login", handleAdminLogin);

export default authRoutes;