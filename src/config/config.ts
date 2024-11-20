import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user-model.js";
import { UserChat } from "../models/user-chat-model.js"; 
import { Chat } from "../models/chat-model.js";
import { Message } from "../models/message-model.js";
import { Category } from "../models/category-model.js";
import { Listing } from "../models/listing-model.js";
import { Image } from "../models/image-model.js";
import { Location } from "../models/location-model.js";
import { Token } from "../models/token-model.js";

export const connection = new Sequelize({
    dialect : "mysql",
    host: "localhost",
    port : 3306,
    username : "root",
    password : "rootroot",
    database : "olx_clone",
    models: [User,UserChat,Chat,Message,Category,Listing,Image,Location,Token]
})