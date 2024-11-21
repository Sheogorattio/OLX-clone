import { Request, Response, NextFunction } from "express";
import { Token } from "../models/token-model.js";
import { User } from "../models/user-model.js";

export class TokenController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const token = await Token.create(req.body);
            return res.status(201).json(token);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to create token" });
        }
    }

    static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const tokens = await Token.findAll({ include: User });
            return res.status(200).json(tokens);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch tokens" });
        }
    }
}
