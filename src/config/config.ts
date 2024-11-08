import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user-model.js";

export const connection = new Sequelize({
    dialect : "mysql",
    host: "localhost",
    port : 3306,
    username : "root",
    password : "rootroot",
    database : "olx_clone",
    models: [User]
})