import { getSterling } from "../controllers/sterlingController";
import express from "express";

const router = express.Router();

router.get("/", getSterling)

export default router;