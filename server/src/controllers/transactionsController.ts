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

const mapSterlingTransactions: TransactionDataType[] = sterlingData.map((transaction) => {
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

const mapMonzoTransactions: TransactionDataType[] = monzoData.map((transaction) => {
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

const mapRevolutTransaction: TransactionDataType[] = revolutData.map((transaction) => {
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


export const getTransactions: RequestHandler = (req, res, next) => {

  try {
    const transactions = [
      ...mapSterlingTransactions,
      ...mapMonzoTransactions,
      ...mapRevolutTransaction
    ];

    res.json({ transactions });
  } catch (error) {
    next(error);
  }
};


export const getBanksTransactions: RequestHandler = (req, res, next) => {
    try {
      const source = req.query.source;
      let transactions: TransactionDataType[] = []; 

      if(source === 'sterling') {
        transactions = mapSterlingTransactions;
      } else if (source === 'monzo') {
        transactions = mapMonzoTransactions;
      } else if (source === 'revolut') {
        transactions = mapRevolutTransaction;
      } else {
        throw createHttpError(404, "Data not found")
      }

      res.json({ transactions });
    } catch (error) {
      next(error)
    }
};



  // export function getTransactionsFromBank(bank: any): TransactionDataType[] {
  //   // Replace this with actual implementation that retrieves transactions from the specified bank
  //   const mockTransactions: TransactionDataType[] = [
  //     {
  //       id: "1",
  //       created: "2022-03-21T14:16:32.000Z",
  //       description: "Payment to John Smith",
  //       amount: {
  //         value: "-50.00",
  //         currency: "GBP",
  //       },
  //       type: "DEBIT",
  //       reference: "REF-1234567890",
  //       metadata: {
  //         source: bank,
  //       },
  //     },
  //     {
  //       id: "2",
  //       created: "2022-03-20T12:30:15.000Z",
  //       description: "Deposit from Jane Doe",
  //       amount: {
  //         value: "100.00",
  //         currency: "GBP",
  //       },
  //       type: "CREDIT",
  //       reference: "REF-0987654321",
  //       metadata: {
  //         source: bank,
  //       },
  //     },
  //   ];
  
  //   return mockTransactions;
  // }
