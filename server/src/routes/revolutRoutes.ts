import { getRevolut } from "../controllers/revolutController";
import express from "express";

const router = express.Router();

router.get("/", getRevolut)

export default router;