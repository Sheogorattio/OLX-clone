import { IListing } from "../interfaces/listing-interface.js";
import { Listing } from "../models/listing-model.js";
import {Request, Response, NextFunction} from "express";
import { User } from "../models/user-model.js";
import { randomUUID } from "node:crypto";
import { IImage } from "../interfaces/image-interface.js";
import { Image } from "../models/image-model.js";

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

    static async getAllListings(req: Request, res: Response): Promise<any> {
        try {
            const listings = await Listing.findAll();
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
}
