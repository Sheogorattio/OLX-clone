import { Router } from "express";
import { CategoryController } from "../controllers/category-controller.js";

export const categoryRoutes = Router();

categoryRoutes.route("/")
    .post(CategoryController.create)
    .get(CategoryController.getAll);


categoryRoutes.route("/:id")
    .get(CategoryController.getById)
    .patch(CategoryController.update)
    .delete(CategoryController.delete);
