import { Request, Response, NextFunction } from "express";
import { Location } from "../models/location-model.js";

export class LocationController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const location = await Location.create(req.body);
            return res.status(201).json(location);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to create location" });
        }
    }

    static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const locations = await Location.findAll();
            return res.status(200).json(locations);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch locations" });
        }
    }
}
