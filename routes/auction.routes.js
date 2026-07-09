import express from "express";
import {
  createAuction,
  showAuction,
  auctionById,
  placeBid,
  dashboardData,
  myAuction,
  myBids,
} from "../controllers/auction.controller.js";
import { secureRoute } from "../middleware/auth.middleware.js";

const auctionRoutes = express.Router();

// Public routes
auctionRoutes.get("/", showAuction);

// Protected routes
auctionRoutes.get("/stats", secureRoute, dashboardData);
auctionRoutes.get("/myauction", secureRoute, myAuction);
auctionRoutes.get("/mybids", secureRoute, myBids);

auctionRoutes.post("/", secureRoute, createAuction);
auctionRoutes.post("/:id/bid", secureRoute, placeBid);

// Keep this LAST
auctionRoutes.get("/:id", secureRoute, auctionById);

export default auctionRoutes;
