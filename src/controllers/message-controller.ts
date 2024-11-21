import { Request, Response } from "express";
import { Message } from "../models/message-model.js";
import { User } from "../models/user-model.js";
import { randomUUID } from "crypto";

export class MessageController {
    static async sendMessage(req: Request, res: Response): Promise<any> {
        const { chatId, text } = req.body;
        const senderId = req.session.user.id;

        const id = randomUUID();
        try {
            const newMessage = await Message.create({
                id,
                chatId,
                senderId,
                text,
            });

            return res.status(201).json({ message: "Message sent successfully", data: newMessage });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to send message", error });
        }
    }

    static async getChatMessages(req: Request, res: Response): Promise<any> {
        const { chatId } = req.params;

        try {
            const messages = await Message.findAll({
                where: { chatId },
                include: [{ model: User, as: "sender", attributes: ["id", "name", "profilePictureId"] }],
                order: [["createdAt", "ASC"]],
            });

            if (messages.length === 0) {
                return res.status(404).json({ message: "No messages found", data: null });
            }

            return res.status(200).json({ message: "Messages retrieved successfully", data: messages });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to retrieve messages", error });
        }
    }
}
