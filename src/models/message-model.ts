import { Model, Table, Column, ForeignKey, DataType, HasOne, BelongsTo } from "sequelize-typescript";
import { Chat } from "./chat-model.js";
import { User } from "./user-model.js";

@Table({
    tableName: "messages",
    timestamps: true
})
export class Message extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
    })
    id!: string

    @ForeignKey(()=> Chat)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    chatId!: string;

    @BelongsTo(()=> Chat)
    chat!: Chat;

    @ForeignKey(()=>User)
    @Column({
        type: DataType.UUID,
        allowNull:false
    })
    senderId! : string;

    @BelongsTo(()=> User)
    sender!: User;

    @Column({
        type : DataType.STRING,
        allowNull: false
    })
    text! :string;
}