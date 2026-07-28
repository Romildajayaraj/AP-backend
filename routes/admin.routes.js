import express from "express";
import {
  getAdminDashboard,
  getAllUsers,
  deleteUser,
  updateUserRole,
  updateUserStatus,
   getAllAuctions,
   getUserById,
} from "../controllers/admin.controller.js";
import { checkAdmin, secureRoute } from "../middleware/auth.middleware.js";

const adminRoutes = express.Router();
adminRoutes.use(secureRoute);

adminRoutes.get("/dashboard", checkAdmin, getAdminDashboard);
adminRoutes.get("/users", checkAdmin, getAllUsers);
adminRoutes.get("/auctions",checkAdmin,getAllAuctions);
adminRoutes.get("/users/:id", secureRoute, checkAdmin, getUserById);
adminRoutes.delete(
  "/users/:id",
  secureRoute,
  checkAdmin,
  deleteUser
);

adminRoutes.patch(
  "/users/:id/role",
  checkAdmin,
  updateUserRole
);

adminRoutes.patch(
  "/users/:id/status",
  checkAdmin,
  updateUserStatus
);

export default adminRoutes;
