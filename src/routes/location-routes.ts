import { Router } from "express";
import { LocationController } from "../controllers/location-controller.js";

export const locationRoutes = Router();

locationRoutes.route("/")
    .post(LocationController.create)
    .get(LocationController.getAll);

locationRoutes.route("/:id")
    .get(LocationController.getById)
    .patch(LocationController.update)
    .delete(LocationController.delete);
