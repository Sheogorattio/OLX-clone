import { Router } from "express";
import { LocationController } from "../controllers/location-controller.js";

export const locationRoutes = Router();

locationRoutes.route("/")
    .get(LocationController.getAll)
    .post(LocationController.create);
