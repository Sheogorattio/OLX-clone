import { IUser } from "../interfaces/user-interface.js";
import { User } from "../models/user-model.js";
import {Request, Response, NextFunction} from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import { Listing } from "../models/listing-model.js";
import { Token } from "../models/token-model.js";
import crypto from "crypto"
import "dotenv/config"
import nodemailer from "nodemailer"
import { clientRedis } from "../config/redis-config.js";
import {randomUUID} from "crypto"

export class UserController  {
    static async create(req:Request<{},{},IUser>, res:Response, next:NextFunction):Promise<any>{
        try{
            const user = {...req.body};
            user.id = randomUUID();
            const reExp = new RegExp('^(?=.*\\w)(?=.*\\W)(?=.*\\d).{8,}');
            if(user && 
                validator.isEmail(user.email) &&
                 user.password &&
                  validator.isMobilePhone(user.phone) &&
                   user.profile_picture && user.location_id && 
                    reExp.test(req.body.password) ){
                const saltRounds = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, saltRounds);
                await User.create(user);
                req.body = user;
                res.status(201).send("User was created successfully");
            }
            else {
                return res.status(400).json({message : "All fields must contain valide data", data : null});
            }
        }
        catch{
            return res.status(500).json({message : "Failed to create user.", data : null});
        }
    }

    // static async getByEmail(req:Request, res:Response):Promise<any>{
    //     try{
    //         const email = req.params.email;
    //         const user = await User.findOne({where : {email : email}});
    //         if(user){
    //             return res.status(200).json({message : "User found", data : user});
    //         }
    //         else{
    //             return res.status(404).json({message : "User not found", data : null});
    //         }
    //     }
    //     catch(error:any){
    //         return res.status(500).json({message : "Failed to get user by email.", data: error.message});

    //     }
    // }

    static async getAll(req:Request, res:Response):Promise<any>{
        const userFromRedis = await clientRedis.get("users");
        if(userFromRedis?.length!>3){
            console.log("Reading drom Redis...");
            return res.status(200).json(JSON.parse(userFromRedis!))
        }
        const users = await User.findAll({include : Listing});
        if(users){
            await clientRedis.set("users", JSON.stringify(users),{EX:30});
            return res.status(200).json({message : "Users were retrieved successfully.", data : users});
        }
        else{
            return res.status(404).json({message : "No users found.", data : null});
        }
    }

    static async login (req: Request, res:Response, next:NextFunction):Promise<any>{
        try{
            const user = await User.findOne({where: { email: req.body.email }});
            console.log(user);
            if(user && await bcrypt.compare(req.body.password, user.password)){
                req.body = user;
                next();
            }
            else{
                return res.status(401).json({message : "Invalid email or password.", data : null});
            }
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message : "Failed to login user.", data : null});
        }
    }

    static async saveUserToSession (req: Request<{}, {}, IUser>, res: Response, next: NextFunction):Promise<any>{
        req.session.user = req.body;
        req.session.save((err) => {
            if (err) {
                res.status(500).json({ message: "Failed to save session\n" + err.message });
            }
            res.status(200).json({ message: "Login was successfull.", user: {email: req.body.email, image: req.body.profile_picture, location: req.body.location_id, phone: req.body.phone} });
        });
    }

    static async logout (req:Request, res:Response){
        req.session.destroy((err)=> {
            if (err) {
                res.status(500).json({ message: "Failed to destroy session\n" + err.message})
            }
            res.status(200).json({message: "Logout was successful", data: null});
        });
    }

    static async initializePasswordRecovery (req: Request<{},{},{email : string}>, res:Response){
        try{  
            const user = await User.findOne({where:{email: req.body.email}});
            if(!user){
                res.status(400).send("User with given email does not exist");
                return;
            }
            let token = await Token.findOne({where:{userId: user.id}});
            if(!token){
                token = await Token.create({
                    id: crypto.randomUUID(),
                    userId: user?.id,
                    value: crypto.randomBytes(32).toString("hex"),
                })
            }
            const link = `${process.env.BASE_URL}/password-reset/${user.id}/${token.value}`;
            await UserController.sendEmail(user.email, "Passwords recovery", link);
            res.status(200).send(link);
        }catch (error){
            res.status(500).send("An error occured");
            console.log(error);
        }
    }

    static async recoverPassword (req: Request<{userId:string,token : string }, {}, {password: string}>, res: Response){
        try{
            const user = await User.findOne({where:{id: req.params.userId}});
            if(!user){
                res.status(400).send("User with given email does not exist");
                return;
            }
            const token = await Token.findOne({where:{userId: user.id, value: req.params.token}});
            if(!token){
                res.status(400).send("Invalid link or expired");
                return;
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;

            await user.save();
            await token.destroy();

            res.status(200).send("Password was changed");

        }catch(error){
            res.status(500).send("An error occured");
            console.log(error);
        }
    }

    private static async sendEmail (email:string, subject:string, text:string) {
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                port: 587,
                secure: true,
                auth: {
                    user: process.env.USER_MAIL,
                    pass: process.env.PASS_MAIL,
                },
            });
    
            await transporter.sendMail({
                from: process.env.USER_MAIL,
                to: email,
                subject: subject,
                text: text,
            });
    
            console.log("Email sent sucessfully");
        } catch (error) {
            console.log(error, "Email not sent");
        }
    }

    static async getById(req: Request<{ id: string }>, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            console.log("USER ID: " + id);
            const user = await User.findByPk(id, { include: Listing });
            if (!user) {
                return res.status(404).json({ message: "User not found.", data: null });
            }
            return res.status(200).json({ message: "User retrieved successfully.", data: user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to retrieve user.", data: null });
        }
    }

    static async update(req: Request<{ id: string }, {}, IUser>, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const updateData = req.body;
    
            if (updateData.password) {
                const salt = await bcrypt.genSalt(10);
                updateData.password = await bcrypt.hash(updateData.password, salt);
            }
    
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found.", data: null });
            }
    
            await user.update(updateData);
            return res.status(200).json({ message: "User updated successfully.", data: user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to update user.", data: null });
        }
    }
    
    static async delete(req: Request<{ id: string }>, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found.", data: null });
            }
    
            await user.destroy();
            return res.status(200).json({ message: "User deleted successfully.", data: null });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to delete user.", data: null });
        }
    }
}