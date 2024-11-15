import { Model, Table, Column, ForeignKey, DataType, BelongsToMany, BelongsTo, HasMany} from "sequelize-typescript";
import { User } from "./user-model.js";
import { UserChat } from "./user-chat-model.js";
import { Listing } from "./listing-model.js";
import { Message } from "./message-model.js";

@Table({
    tableName: "chats",
    timestamps: true
})
export class Chat extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
    })
    id!: string;

    @ForeignKey(()=>User)
    @Column({
        type: DataType.UUID,
        allowNull:false
    })
    buyerId!: string;

    @ForeignKey(()=>User)
    @Column({
        type: DataType.UUID,
        allowNull:false
    })
    sellerId!: string;

    @BelongsToMany(()=>User, () => UserChat)
    users!: User[];

    @ForeignKey(()=> Listing)
    @Column({
        type: DataType.UUID, 
        allowNull:false
    })
    listingId!: string;

    @BelongsTo(()=>Listing)
    listing!: Listing;

    @HasMany(()=>Message)
    messages!: Message[];
}