import { getMonzo } from "../controllers/monzoController";
import express from "express";

const router = express.Router();

router.get("/", getMonzo)

export default router;