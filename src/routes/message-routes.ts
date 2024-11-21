import { Router } from "express";
import { MessageController } from "../controllers/message-controller.js";

export const messageRoutes = Router();

messageRoutes.route("/")
    .post(MessageController.sendMessage);

// Отримання повідомлень конкретного чату
messageRoutes.route("/:chatId")
    .get(MessageController.getChatMessages);
