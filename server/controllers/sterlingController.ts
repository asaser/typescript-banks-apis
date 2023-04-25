import { RequestHandler } from "express";
import createHttpError from "http-errors";
import sterlingDataBanks from "../data/sterling-tx.json";
import { SterlingDataType } from "../models/bankDataTypes";
import axios from "axios";

export interface SterlingControllerDataType {
    data: SterlingDataType;
}

export const getSterling: RequestHandler = async (req, res, next) => {
    try {

        console.log('11111111111');
        
        const response = await axios.get<SterlingControllerDataType[]>('http://localhost:5000/api/sterling');
        
        console.log('2222222222222');
        if(response.status !== 200) {
            throw createHttpError(response.status, "Can not retrieve Sterling Bank data")
        }
        
        console.log('333333333333');
        const sterlingDataTypes = response.data;
        const sterlingDataType = sterlingDataTypes;         

        res.status(200).json(sterlingDataType)
    } catch (error) {
        next(error)
    }
}
