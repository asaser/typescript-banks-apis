import { RequestHandler } from "express";
import createHttpError from "http-errors";
import monzoDataBanks from "../data/monzo-tx.json";
import { MonzoDataType } from "../models/bankDataTypes";

export const getMonzo: RequestHandler = async (req, res, next) => {
    try {
        if(!monzoDataBanks.length) {
            throw createHttpError(404, "Monzo data not found")
        }

        const monzoDataTypes = await monzoDataBanks as MonzoDataType[];
        const monzoDataType = monzoDataTypes;         

        res.status(200).json(monzoDataType)
    } catch (error) {
        next(error)
    }
}
