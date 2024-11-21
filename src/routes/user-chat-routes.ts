import { Router } from "express";
import { UserChatController } from "../controllers/user-chat-controller.js";

export const userChatRoutes = Router();

userChatRoutes.route("/")
    .get(UserChatController.getAll)
    .post(UserChatController.create);
