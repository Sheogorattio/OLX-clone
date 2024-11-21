import { Request, Response, NextFunction } from "express";
import { UserChat } from "../models/user-chat-model.js";
import { User } from "../models/user-model.js";
import { Chat } from "../models/chat-model.js";

export class UserChatController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const userChat = await UserChat.create(req.body);
            return res.status(201).json(userChat);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to create user-chat relation" });
        }
    }

    static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const userChats = await UserChat.findAll({ include: [User, Chat] });
            return res.status(200).json(userChats);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to fetch user-chat relations" });
        }
    }
}
