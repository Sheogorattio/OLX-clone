import { Model, Table, Column, ForeignKey, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { User } from "./user-model.js";
import { Location } from "./location-model.js";
import { Category } from "./category-model.js";
import { Chat } from "./chat-model.js";
import { Image } from "./image-model.js";

@Table({
    tableName: "listings",
    timestamps: true
})
export class Listing extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    description!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    price!: number;
    
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    isAvailable!: boolean;

    @ForeignKey(()=> User)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    userId!: string;

    @BelongsTo(()=> User)
    user!: User;

    @ForeignKey(()=> Location)
    @Column({
        type: DataType.UUID, 
        allowNull: true
    })
    locationId!: string;

    @BelongsTo(()=> Location)
    location!: Location;

    @ForeignKey(()=> Category)
    @Column({
        type: DataType.UUID,
        allowNull: true
    })
    categoryId!: Category;

    @BelongsTo(()=> Category)
    category!: Category;

    @HasMany(()=> Chat)
    chats!: Chat[];

    @HasMany(() => Image)
    images!: Image[];
}