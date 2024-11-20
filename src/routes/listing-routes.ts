import { Router } from "express";
import { ListingController } from "../controllers/listing-controller.js";

export const listingRoutes = Router();

listingRoutes.route("/")
.post(ListingController.create)
.get(ListingController.getAll);