import { Model, Table, Column, ForeignKey, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Listing } from "./listing-model.js";

@Table({
    tableName: "locations",
    timestamps: false
})
export class Location extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
    })
    id!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string

    @HasMany(()=>User)
    users! : User[];

    @HasMany(()=> Listing)
    listings! : Listing[];
}