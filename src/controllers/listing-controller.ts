import { IListing } from "../interfaces/listing-interface.js";
import { Listing } from "../models/listing-model.js";
import {Request, Response, NextFunction} from "express";
import { User } from "../models/user-model.js";
import { randomUUID } from "node:crypto";
import { IImage } from "../interfaces/image-interface.js";
import { Image } from "../models/image-model.js";
import { Location } from "../models/location-model.js";
import { Op } from "sequelize";

export class ListingController {
    static async createListing(req: Request<{},{},IListing>, res: Response): Promise<any> {
        try {
            const id = randomUUID();
            let listingParams = {id, ...req.body};
            const listing = await Listing.create(listingParams);

            //створення зображень, прикрыплених до оголощення
            if(listingParams.pictures != null){
                console.log(listingParams.pictures[1]);
                listingParams.pictures.forEach(async element => {
                    console.log("element "+element);
                    const picId = randomUUID();
                    const pictureParams :IImage = {
                        listingId:listing.id,
                        url:element
                    };

                    const picture = await Image.create({"id" : picId, ...pictureParams});                
                });
            }
            return res.status(201).json({ message: "Listing created successfully", data: listing });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to create listing", error });
        }
    }

static async getAllListings(req: Request<{},{word? :string, category? :string, sortBy? :string, order? :string},{}>, res: Response): Promise<any> {
        const { word, category, sortBy, order } = req.query;
        try {
            let listings: Listing[] = await Listing.findAll({
                include: [Image, Location], 
            });
            if (word  && typeof word === 'string') {
                listings = await ListingController.findByWord(word);
            }
            if(category && typeof category === 'string') {
                listings = await ListingController.findByCategory(category, listings);
            }
            if(sortBy && order  && typeof sortBy === 'string'  && typeof order === 'string') {
                listings = await ListingController.sortBy(sortBy as "price" | "createdAt" | "name", order as "ASC" | "DESC", listings);
            }
            
            return res.status(200).json({ message: "Listings retrieved successfully", data: listings });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to retrieve listings", error });
        }
    }

    static async getListingById(req: Request<{id:string}>, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            const listing = await Listing.findByPk(id);
            if (!listing) {
                return res.status(404).json({ message: "Listing not found" });
            }
            return res.status(200).json({ message: "Listing retrieved successfully", data: listing });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to retrieve listing", error });
        }
    }

    static async updateListing(req: Request<{id:string}>, res: Response): Promise<any> {
        const { id } = req.params;
        const updateData = req.body;

        try {
            const listing = await Listing.findByPk(id);
            if (!listing) {
                return res.status(404).json({ message: "Listing not found" });
            }

            await listing.update(updateData);
            return res.status(200).json({ message: "Listing updated successfully", data: listing });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to update listing", error });
        }
    }

    static async deleteListing(req: Request<{id:string}>, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const listing = await Listing.findByPk(id);
            if (!listing) {
                return res.status(404).json({ message: "Listing not found" });
            }

            await listing.destroy();
            return res.status(200).json({ message: "Listing deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to delete listing", error });
        }
    }

    static async findByWord(word:string, listings?: Listing[]): Promise<any>{
        let result: Listing[] = new Array<Listing>();

        try{
            if(!listings){
                return await Listing.findAll({
                    where: {
                        name : {
                            [Op.like]: `%${word}%`
                        }
                    },
                    include: [Image, Location]
                })
            }
            else{
                return listings.filter(listing => listing.name.toLowerCase().includes(word.toLowerCase()));
            }
        }
        catch(error){
            console.error(error);
            throw new Error("Failed to filter listings by word");
        }
    }

    static async findByCategory(categoryId:string, listings?: Listing[]): Promise<any>{
        const catId = categoryId;
        let result: Listing[] = new Array<Listing>();
        try{
            if(!listings){
                return await Listing.findAll({
                    where: {
                        categoryId: catId
                    }
                });
            }
            else{
                return result.filter(listing => listing.categoryId.toLowerCase().includes(categoryId.toLowerCase()));
            }
        }
        catch(error){
            console.log(error);
            throw new Error("Failed to filter listings by category");
        }
    }

    static async sortBy(sortBy: "price" | "createdAt" | "name", order: "ASC" | "DESC" ,  listings?: Listing[]): Promise<any> {

        let result = listings || await Listing.findAll();
        
        return result.sort((a, b) => {
            if (sortBy === "price") {
                return order === "ASC" ? a.price - b.price : b.price - a.price;
            } else if (sortBy === "createdAt") {
                return order === "ASC"
                    ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else if (sortBy === "name") {
                return order === "ASC"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }
            return 0; 
        });
    }
    
}
