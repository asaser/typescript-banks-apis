import { RequestHandler } from "express";
import createHttpError from "http-errors";
import revolutDataBanks from "../data/revolut-tx.json";
import { RevolutDataType } from "../models/bankDataTypes";


export const getRevolut: RequestHandler = async (req, res, next) => {
    try {

        if(!revolutDataBanks) {
            throw createHttpError(404, "Monzo data not found")
        }

        const revolutDataTypes = revolutDataBanks as RevolutDataType[];
        const revolutDataType = revolutDataTypes[0];         

        res.status(200).json(revolutDataType)
    } catch (error) {
        next(error)
    }
}
