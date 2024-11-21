import { Request, Response, NextFunction } from "express";
import { Category } from "../models/category-model.js";

export class CategoryController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const category = await Category.create(req.body);
            return res.status(201).json(category);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to create category" });
        }
    }

    static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const categories = await Category.findAll({ include: [{ model: Category, as: 'children' }] });
            return res.status(200).json(categories);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch categories" });
        }
    }
}
