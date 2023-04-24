import { RequestHandler } from "express";
import createHttpError from "http-errors";
import sterlingDataBanks from "../data/sterling-tx.json";
import { SterlingDataType } from "../models/bankDataTypes";


export const getSterling: RequestHandler = async (req, res, next) => {
    try {

        // To-Do check that error
        if(!sterlingDataBanks) {
            throw createHttpError(404, "Monzo data not found")
        }

        const SterlingDataTypes = sterlingDataBanks as SterlingDataType[];
        const SterlingDataType = SterlingDataTypes[0];         

        res.status(200).json(SterlingDataType)
    } catch (error) {
        next(error)
    }
}
