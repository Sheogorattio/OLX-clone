import { Router } from "express";
import { MessageController } from "../controllers/message-controller.js";

export const messageRoutes = Router();

messageRoutes.route("/")
    .post(MessageController.sendMessage);

// Отримання всіх повідомлень для конкретного чату
messageRoutes.route("/:chatId")
    .get(MessageController.getChatMessages);

messageRoutes.route("/:chatId/:messageId")
    .put(MessageController.updateMessage)
    .delete(MessageController.deleteMessage);
