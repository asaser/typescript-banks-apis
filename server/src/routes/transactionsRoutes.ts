import { getTransactions } from "../controllers/transactionsController";
import express from "express";

const router = express.Router();

router.get("/", getTransactions)

export default router;