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
auctionRoutes.get("/:id", auctionById);

// Protected routes
auctionRoutes.get("/stats", secureRoute, dashboardData);
auctionRoutes.post("/", secureRoute, createAuction);
auctionRoutes.get("/myauction", secureRoute, myAuction);
auctionRoutes.get("/mybids", secureRoute, myBids);
auctionRoutes.post("/:id/bid", secureRoute, placeBid);


export default auctionRoutes;
