import { Model, Table, Column, ForeignKey, DataType, HasOne, BelongsTo } from "sequelize-typescript";
import { Listing } from "./listing-model.js";
import { User } from "./user-model.js";

@Table({
    tableName: "images",
    timestamps: false
})
export class Image extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
    })
    id!: string

    @Column({
        type: DataType.STRING,
        allowNull:false        
    })
    url!: string;

     @ForeignKey(() => Listing)
     @Column(DataType.UUID)
     listingId!: string;
 
     @BelongsTo(() => Listing)
     listing!: Listing;
 
     @ForeignKey(() => User)
     @Column(DataType.UUID)
     userId!: string;
 
     @BelongsTo(() => User)
     user!: User;
}