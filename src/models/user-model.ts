import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo, BelongsToMany, HasOne } from "sequelize-typescript";
import { IUser } from "../interfaces/user-interface.js";
import {Image} from "./image-model.js";
import { Location } from "./location-model.js";
import { Message } from "./message-model.js";
import { Listing } from "./listing-model.js";
import { Chat } from "./chat-model.js";
import { UserChat } from "./user-chat-model.js";
import { userRoutes } from "../routes/user-routes.js";
import { Token } from "./token-model.js";

enum UserRole { 
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest"
}
@Table({
    tableName: "users"
})
export class User extends Model<IUser>{
    @Column({
        type : DataType.UUID,
        primaryKey: true,
    })
    id!: string;

    @Column({
        type: DataType.STRING(100),  
    })
    name! :string;

    @Column({
        type: DataType.STRING(30),  
    })
    email! :string;

    @Column({
        type : DataType.STRING(100)
    })
    password! :string;
    
    @Column({
        type : DataType.STRING(100)
    })
    phone! :string;
    
    @ForeignKey(()=> Image)
    @Column({
        type : DataType.UUID,
        allowNull: true,
    })
    profilePictureId! :string;

    @HasOne(() => Image)
    avatar!: Image;

    @ForeignKey(()=> Location)
    @Column({
        type : DataType.UUID,
        allowNull: true,
    })
    locationId!: string;

    @Column({
        type: DataType.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue: UserRole.GUEST
    })
    role!: UserRole;

    @BelongsTo(()=> Location)
    location!: Location;

    @HasMany(()=>Message)
    messages!: Message[];

    @HasMany(()=> Listing)
    listings!: Listing[];

    @BelongsToMany(()=> Chat, ()=> UserChat)
    chats!: Chat[];

    @HasOne(()=> Token)
    token!: Token;
}