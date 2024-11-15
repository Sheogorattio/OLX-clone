import { Model, Table, Column, ForeignKey, DataType, BelongsTo, HasMany } from "sequelize-typescript";

@Table({
    tableName: "categories",
    timestamps: false
})
export class Category extends Model {
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

    @ForeignKey(() => Category)
    @Column({
        type: DataType.UUID,
        allowNull: true 
    })
    parentId!: string;

    @BelongsTo(() => Category, 'parentId')
    parent!: Category;

    @HasMany(() => Category)
    children!: Category[];
}
