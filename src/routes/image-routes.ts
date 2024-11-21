import { Router } from "express";
import { ImageController } from "../controllers/image-controller.js";

export const imageRoutes = Router();


imageRoutes.route("/")
    .post(ImageController.create)
    .get(ImageController.getAll);

imageRoutes.route("/:id")
    .get(ImageController.getById)
    .put(ImageController.update)
    .delete(ImageController.delete);
