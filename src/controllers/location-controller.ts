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

    static async getById(req: Request<{ id: string }>, res: Response): Promise<any> {
        try {
            const location = await Location.findByPk(req.params.id);
            if (!location) {
                return res.status(404).json({ message: "Location not found" });
            }
            return res.status(200).json(location);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch location" });
        }
    }
    
    static async update(req: Request<{ id: string }, {}, { name: string }>, res: Response): Promise<any> {
        try {
            const location = await Location.findByPk(req.params.id);
            if (!location) {
                return res.status(404).json({ message: "Location not found" });
            }
            await location.update(req.body);
            return res.status(200).json({ message: "Location updated successfully", location });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to update location" });
        }
    }
    
    static async delete(req: Request<{ id: string }>, res: Response): Promise<any> {
        try {
            const location = await Location.findByPk(req.params.id);
            if (!location) {
                return res.status(404).json({ message: "Location not found" });
            }
            await location.destroy();
            return res.status(200).json({ message: "Location deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to delete location" });
        }
    }
    
}
