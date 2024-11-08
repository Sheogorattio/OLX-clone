import { Model, Table, Column, DataType } from "sequelize-typescript";
import { IUser } from "../interfaces/user-interface.js";

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
    email! :string;

    @Column({
        type : DataType.STRING(100)
    })
    password! :string;
    
    @Column({
        type : DataType.STRING(100)
    })
    phone! :string;
    
    @Column({
        type : DataType.STRING(100),
    })
    profile_picture! :string;
    
    @Column({
        type : DataType.STRING(100)
    })
    location_id! :string;
}