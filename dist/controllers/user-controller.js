import { User } from "../models/user-model.js";
import validator from "validator";
import bcrypt from "bcrypt";
export class UserController {
    static async create(req, res, next) {
        try {
            const user = { ...req.body };
            const reExp = new RegExp('^(?=.*\\w)(?=.*\\W)(?=.*\\d).{8,}');
            if (user &&
                validator.isEmail(user.email) &&
                user.password &&
                validator.isMobilePhone(user.phone) &&
                user.profile_picture && user.location_id &&
                reExp.test(req.body.password)) {
                const saltRounds = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, saltRounds);
                await User.create(user);
                req.body = user;
                next();
            }
            else {
                return res.status(400).json({ message: "All fields must contain valide data", data: null });
            }
        }
        catch {
            return res.status(500).json({ message: "Failed to create user.", data: null });
        }
    }
    static async getAll(req, res) {
        const users = await User.findAll();
        if (users) {
            return res.status(200).json({ message: "Users were retrieved successfully.", data: users });
        }
        else {
            return res.status(404).json({ message: "No users found.", data: null });
        }
    }
    static async login(req, res, next) {
        console.log('INSIDE LOGIN');
        try {
            console.log("BODY" + JSON.stringify(req.body));
            console.log("PARAMS" + JSON.stringify(req.params));
            console.log("QUERY" + JSON.stringify(req.query));
            const user = await User.findOne({ where: { email: req.body.email } });
            console.log(user);
            if (user && await bcrypt.compare(req.body.password, user.password)) {
                req.body = user;
                next();
            }
            else {
                return res.status(401).json({ message: "Invalid email or password.", data: null });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Failed to login user.", data: null });
        }
    }
    static async saveUserToSession(req, res, next) {
        req.session.user = req.body;
        req.session.save((err) => {
            if (err) {
                res.status(500).json({ message: "Failed to save session\n" + err.message });
            }
            res.status(201).json({ message: "User was created.", user: { email: req.body.email, image: req.body.profile_picture, location: req.body.location_id, phone: req.body.phone } });
        });
    }
    static async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({ message: "Failed to destroy session\n" + err.message });
            }
            res.status(200).json({ message: "Logout was successful", data: null });
        });
    }
}
