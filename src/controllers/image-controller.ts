import { Request, Response, NextFunction } from "express";
import { Image } from "../models/image-model.js";
import { Listing } from "../models/listing-model.js";
import { User } from "../models/user-model.js";

export class ImageController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const image = await Image.create(req.body);
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
}
