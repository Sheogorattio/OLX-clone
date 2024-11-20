import {Model, Column, Table, ForeignKey, DataType, BelongsTo } from "sequelize-typescript";
import { User } from "./user-model.js";

@Table({
    tableName: "tokens",
    timestamps: true
})
export class Token extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    id!: number;

    @ForeignKey(()=> User)
    @Column({
        type: DataType.UUID,
        allowNull:false
    })
    userId!: string;

    @BelongsTo(()=> User)
    user! : User;

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    value!:string;
}