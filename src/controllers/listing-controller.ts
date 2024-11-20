import { IListing } from "../interfaces/listing-interface.js";
import { Listing } from "../models/listing-model.js";
import {Request, Response, NextFunction} from "express";
import { User } from "../models/user-model.js";

export class ListingController  {
    static async create(req:Request<{},{},IListing>, res:Response, next:NextFunction):Promise<any>{
       
        try{        
            const listing = await Listing.create({...req.body});
            if(listing){
                return res.status(201).json(listing);
            }
            else{
                return res.status(500).json({message:"Failed to create listing"});
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({message:"CATCH Failed to create listing"});
        }
    }

    static async getAll(req:Request, res:Response):Promise<any>{
        const listings = await Listing.findAll({include: User});
        if(listings){
            return res.status(200).json({message : "Listings were retrieved successfully.", data : listings});
        }
        else{
            return res.status(404).json({message : "No listings found.", data : null});
        }
    }
}