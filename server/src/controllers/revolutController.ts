import { RequestHandler } from "express";
import createHttpError from "http-errors";
import revolutDataBanks from "../data/revolut-tx.json";
import { RevolutDataType } from "../models/bankDataTypes";

export const getRevolut: RequestHandler = async (req, res, next) => {
  try {

    if(!revolutDataBanks.length) {
        throw createHttpError(404, "Revolut data not found")
    }

    const revolutDataTypes = await revolutDataBanks as RevolutDataType[];
    const revolutDataType = revolutDataTypes;         

    res.status(200).json(revolutDataType)
  } catch (error) {
    next(error);
  }
}
