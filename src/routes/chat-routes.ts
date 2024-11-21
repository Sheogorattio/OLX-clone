import { Router } from "express";
import { ChatController } from "../controllers/chat-controller.js";

export const chatRoutes = Router();


chatRoutes.route("/")
    .post(ChatController.createChat)
    .get(ChatController.getUserChats);

chatRoutes.route("/:chatId")
    .get(ChatController.getChatById);
