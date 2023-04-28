import createHttpError from "http-errors";
import { TransactionDataType } from "../models/transactionDataTypes";
import { RequestHandler } from 'express';
import monzoDataBanks from "../data/monzo-tx.json";
import revolutDataBanks from '../data/revolut-tx.json';
import sterlingDataBanks from "../data/sterling-tx.json";
import { MonzoDataType, RevolutDataType,  SterlingDataType } from "../models/bankDataTypes";

const sterlingData: SterlingDataType[] = sterlingDataBanks;
const monzoData: MonzoDataType[] = monzoDataBanks;
const revolutData: RevolutDataType[] = revolutDataBanks;

export const mapSterlingTransactions: TransactionDataType[] = sterlingData.map((transaction) => {
  return {
    id: transaction.id,
    created: transaction.created,
    description: transaction.narrative,
    amount: {
      value: transaction.amount,
      currency: transaction.currency
    },
    type: transaction.direction === "OUT" ? "DEBIT" : "CREDIT",
    reference: transaction.reference,
    metadata: {
      source: "Sterling Bank"
    }
  };
});

export const mapMonzoTransactions: TransactionDataType[] = monzoData.map((transaction) => {
  return {
    id: transaction.id,
    created: transaction.created,
    description: transaction.description,
    amount: {
      value: (-1 * transaction.amount).toString(),
      currency: transaction.currency
    },
    type: Number(transaction.amount) < 0 ? 'DEBIT' : 'CREDIT',
    reference: transaction.metadata.reference,
    metadata: {
      source: "Monzo Bank"
    }
  };
});

export const mapRevolutTransaction: TransactionDataType[] = revolutData.map((transaction) => {
  return {
    id: transaction.id,
    created: transaction.created_at,
    description: transaction.counterparty.name,
    amount: {
      value: transaction.amount.value,
      currency: transaction.amount.currency
    },
    type: Number(transaction.amount.value) < 0 ? 'DEBIT' : 'CREDIT',
    reference: transaction.reference,
    metadata: {
      source: "Revolut Bank"
    }
  };
});


export const getTransactions: RequestHandler<void> = (req, res, next) => {

  try {
    const transactions = [
      ...mapSterlingTransactions,
      ...mapMonzoTransactions,
      ...mapRevolutTransaction
    ];

    res.json({ transactions });
  } catch (error) {
    next(createHttpError(500, 'Transactions server error'))
  }
};


export const getBanksTransactions: RequestHandler<void> = (req, res, next) => {
    try {
      const source = req.query.source as string;
      let transactions: TransactionDataType[] = []; 

      if (!source || !['sterling', 'monzo', 'revolut'].includes(source)) {
        throw createHttpError(400, 'Ivalid request - url query not found')
      }

      if(source === 'sterling') {
        transactions = mapSterlingTransactions;
      } else if (source === 'monzo') {
        transactions = mapMonzoTransactions;
      } else if (source === 'revolut') {
        transactions = mapRevolutTransaction;
      }

      if (transactions.length === 0) {
        throw createHttpError(404, "Data not found");
      }

      res.json({ transactions });
    } catch (error) {
      next(createHttpError(500, 'Banks transactions server error'))
    }
};