import { getBanksTransactions, getTransactions } from "../controllers/transactionsController";
import express from "express";

const router = express.Router();

router.get("/", getTransactions);
router.get("/bank", getBanksTransactions);

export default router;