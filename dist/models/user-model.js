var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Model, Table, Column, DataType } from "sequelize-typescript";
let User = class User extends Model {
};
__decorate([
    Column({
        type: DataType.UUID,
        primaryKey: true,
    })
], User.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING(100),
    })
], User.prototype, "email", void 0);
__decorate([
    Column({
        type: DataType.STRING(100)
    })
], User.prototype, "password", void 0);
__decorate([
    Column({
        type: DataType.STRING(100)
    })
], User.prototype, "phone", void 0);
__decorate([
    Column({
        type: DataType.STRING(100),
    })
], User.prototype, "profile_picture", void 0);
__decorate([
    Column({
        type: DataType.STRING(100)
    })
], User.prototype, "location_id", void 0);
User = __decorate([
    Table({
        tableName: "users"
    })
], User);
export { User };
