import { Router } from "express";
import { CategoryController } from "../controllers/category-controller.js";

export const categoryRoutes = Router();

categoryRoutes.route("/")
    .get(CategoryController.getAll)
    .post(CategoryController.create);
