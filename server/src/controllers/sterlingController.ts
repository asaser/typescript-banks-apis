import { RequestHandler } from "express";
import createHttpError from "http-errors";
import sterlingDataBanks from "../data/sterling-tx.json";
import { SterlingDataType } from "../models/bankDataTypes";

export const getSterling: RequestHandler = async (req, res, next) => {
    try {

        if(!sterlingDataBanks.length) {
            throw createHttpError(404, "Sterling data not found")
        }

        const sterlingDataTypes = await sterlingDataBanks as SterlingDataType[];
        const sterlingDataType = sterlingDataTypes;         

        res.status(200).json(sterlingDataType)
    } catch (error) {
        next(error)
    }
}
