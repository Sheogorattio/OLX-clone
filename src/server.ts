import express from "express";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";
import https from "node:https";
import { userRoutes } from "./routes/user-routes.js";
import { connection } from "./config/config.js";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import { listingRoutes } from "./routes/listing-routes.js";


const PORT = 443;
const app = express();
const dirname = path.dirname(process.argv[1]);

connection.sync({alter: true})
.then(() => {
    const options = {
        key: fs.readFileSync(path.join(dirname, '..', 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(dirname, '..', 'cert', 'cert.pem')),
    };
   
    const SessionStore = SequelizeStore(session.Store);
    const sessionStore = new SessionStore({
        db: connection,
    });

    try {
        sessionStore.sync();
        console.log("Session table created successfully");
    } catch (error) {
        console.error("Failed to create session table:", error);
    }

    if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY environment variable is required for session secret.");
    }
    
    app.use(
        session({
            secret: process.env.SECRET_KEY,
            resave: false,
            saveUninitialized: false,
            store: sessionStore,
            cookie: { maxAge: 1000 * 60 * 60 },
        })
    );

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.text());

    app.use("/api/user", userRoutes);
    app.use("/api/listing", listingRoutes);

    app.route("/").get((req, res) => {
        res.send("Welcome to the server!");
    });

    https
        .createServer(options, app)
        .listen(PORT, () => {
            console.log("Server is running on https://127.0.0.1");
        });
})
.catch((error) => {
    console.error("Error connecting to database:", error);
});
