import { Request, Response, NextFunction } from "express";
import { Category } from "../models/category-model.js";
import { randomUUID } from "crypto";

export class CategoryController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const category = {"id": randomUUID(), ...req.body};
            return res.status(201).json(await Category.create(category));
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

    static async getById(req: Request<{ id: string }>, res: Response): Promise<any> {
        try {
            const category = await Category.findByPk(req.params.id, {
                include: [{ model: Category, as: "children" }],
            });
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            return res.status(200).json(category);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch category" });
        }
    }
    
    static async update(req: Request<{ id: string }, {}, { name: string }>, res: Response): Promise<any> {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            await category.update(req.body);
            return res.status(200).json({ message: "Category updated successfully", category });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to update category" });
        }
    }
    
    static async delete(req: Request<{ id: string }>, res: Response): Promise<any> {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            await category.destroy();
            return res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to delete category" });
        }
    }
    
}
