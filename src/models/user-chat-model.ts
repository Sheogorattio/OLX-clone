import { Model, Table, Column, ForeignKey, DataType, BelongsTo, AllowNull } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Chat } from "./chat-model.js";

@Table({
    tableName: "user-chat",
    timestamps: false
})
export class UserChat extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
    })
    id!: string

    @ForeignKey(()=> User)
    @Column({
        type: DataType.UUID,
        allowNull:false
    })
    userId!: string

    @BelongsTo(()=> User)
    user! : User;

    @ForeignKey(()=> Chat)
    @Column({
        type: DataType.UUID,
        allowNull:false
    })
    chatId!: string;

    @BelongsTo(()=> Chat)
    chat!: Chat;
} 