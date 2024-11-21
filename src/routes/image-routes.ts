import { Router } from "express";
import { ImageController } from "../controllers/image-controller.js";

export const imageRoutes = Router();

imageRoutes.route("/")
    .get(ImageController.getAll)
    .post(ImageController.create);
