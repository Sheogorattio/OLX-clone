import { Router } from "express";
import { ChatController } from "../controllers/chat-controller.js";

export const chatRoutes = Router();

// Створення нового чату
chatRoutes.route("/")
    .post(ChatController.createChat);

// Отримання всіх чатів для поточного користувача
chatRoutes.route("/")
    .get(ChatController.getUserChats);

// Отримання інформації про конкретний чат
chatRoutes.route("/:chatId")
    .get(ChatController.getChat);
