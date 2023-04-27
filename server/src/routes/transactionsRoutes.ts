import { getTransactions, getBanksTransactions } from "../controllers/transactionsController";
import express from "express";

const router = express.Router();

router.get("/", getTransactions);
router.get("/", getBanksTransactions);

export default router;