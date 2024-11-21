import { Request, Response } from "express";
import { Chat } from "../models/chat-model.js";
import { Listing } from "../models/listing-model.js";
import { User } from "../models/user-model.js";
import { Op } from "sequelize";
import { randomUUID } from "crypto";

export class ChatController {
    static async createChat(req: Request, res: Response): Promise<any> {
        const { listingId } = req.body;
        const buyerId = req.session.user.id;

        try {
            const listing = await Listing.findByPk(listingId);
            if (!listing) {
                return res.status(404).json({ message: "Listing not found", data: null });
            }

            const sellerId = listing.userId;

            const existingChat = await Chat.findOne({
                where: { listingId, buyerId, sellerId },
            });

            if (existingChat) {
                return res.status(200).json({ message: "Chat already exists", chat: existingChat });
            }

            const id = randomUUID();
            const chat = await Chat.create({ id, listingId, buyerId, sellerId });
            return res.status(201).json({ message: "Chat created successfully", chat });
        } catch (error) {
            console.error(error );
            return res.status(500).json({ message: "Failed to create chat", error });
        }
    }

    static async getUserChats(req: Request, res: Response): Promise<any> {
        const userId = req.session.user.id;

        try {
            const chats = await Chat.findAll({
                where: {
                    [Op.or]: [{ buyerId: userId }, { sellerId: userId }],
                },
                include: [
                    { model: Listing, attributes: ["id", "title", "price"] },
                    { model: User, as: "users", attributes: ["id", "name", "profilePictureId"] },
                ],
            });

            if (chats.length === 0) {
                return res.status(404).json({ message: "No chats found", data: null });
            }

            return res.status(200).json({ message: "Chats retrieved successfully", data: chats });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to retrieve chats", error });
        }
    }

    static async getChatById(req: Request, res: Response): Promise<any> {
        const { chatId } = req.params;

        try {
            const chat = await Chat.findByPk(chatId, {
                include: [
                    { model: Listing, attributes: ["id", "name", "price"] }
                ],
            });

            if (!chat) {
                return res.status(404).json({ message: "Chat not found", data: null });
            }

            return res.status(200).json({ message: "Chat retrieved successfully", data: chat });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to retrieve chat", error });
        }
    }

    static async getAllChats(req: Request, res: Response): Promise<any> {
        try {
            const chats = await Chat.findAll();
            return res.status(200).json({ message: "Chats retrieved successfully", data: chats });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to retrieve chats", error });
        }
    }

    static async updateChat(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const updateData = req.body;

        try {
            const chat = await Chat.findByPk(id);
            if (!chat) {
                return res.status(404).json({ message: "Chat not found" });
            }

            await chat.update(updateData);
            return res.status(200).json({ message: "Chat updated successfully", data: chat });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to update chat", error });
        }
    }

    static async deleteChat(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const chat = await Chat.findByPk(id);
            if (!chat) {
                return res.status(404).json({ message: "Chat not found" });
            }

            await chat.destroy();
            return res.status(200).json({ message: "Chat deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to delete chat", error });
        }
    }
}
