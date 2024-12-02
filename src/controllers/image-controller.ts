import { Request, Response, NextFunction } from "express";
import { Image } from "../models/image-model.js";
import { Listing } from "../models/listing-model.js";
import { User } from "../models/user-model.js";
import { randomUUID } from "crypto";

export class ImageController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const image = await Image.create({"id": randomUUID(), ...req.body});
            return res.status(201).json(image);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to create image" });
        }
    }

    static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const images = await Image.findAll({ include: [Listing, User] });
            return res.status(200).json(images);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch images" });
        }
    }

    static async getById(req: Request<{ id: string }>, res: Response): Promise<any> {
        try {
            const image = await Image.findByPk(req.params.id, {
                include: [Listing, User],
            });
            if (!image) {
                return res.status(404).json({ message: "Image not found" });
            }
            return res.status(200).json(image);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch image" });
        }
    }
    
    static async update(req: Request<{ id: string }, {}, { url: string }>, res: Response): Promise<any> {
        try {
            const image = await Image.findByPk(req.params.id);
            if (!image) {
                return res.status(404).json({ message: "Image not found" });
            }
            await image.update(req.body);
            return res.status(200).json({ message: "Image updated successfully", image });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to update image" });
        }
    }
    
    static async delete(req: Request<{ id: string }>, res: Response): Promise<any> {
        try {
            const image = await Image.findByPk(req.params.id);
            if (!image) {
                return res.status(404).json({ message: "Image not found" });
            }
            await image.destroy();
            return res.status(200).json({ message: "Image deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to delete image" });
        }
    }
    
}
