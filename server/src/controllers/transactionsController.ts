import createHttpError from "http-errors";
import { TransactionDataType } from "../models/transactionDataTypes";
import { Request, RequestHandler, Response, request } from 'express';
import monzoDataBanks from "../data/monzo-tx.json";
import revolutDataBanks from '../data/revolut-tx.json';
import sterlingDataBanks from "../data/sterling-tx.json";
import { MonzoDataType, RevolutDataType,  SterlingDataType } from "../models/bankDataTypes";

const sterlingData: SterlingDataType[] = sterlingDataBanks;
const monzoData: MonzoDataType[] = monzoDataBanks;
const revolutData: RevolutDataType[] = revolutDataBanks;

export const getTransactions = (req: Request, res: Response) => {

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

  const transactions = [
    ...mapSterlingTransactions,
    ...mapMonzoTransactions,
    ...mapRevolutTransaction
  ];
  
  res.json({ transactions });
};


  export function getTransactionsFromBank(bank: any): TransactionDataType[] {
    // Replace this with actual implementation that retrieves transactions from the specified bank
    const mockTransactions: TransactionDataType[] = [
      {
        id: "1",
        created: "2022-03-21T14:16:32.000Z",
        description: "Payment to John Smith",
        amount: {
          value: "-50.00",
          currency: "GBP",
        },
        type: "DEBIT",
        reference: "REF-1234567890",
        metadata: {
          source: bank,
        },
      },
      {
        id: "2",
        created: "2022-03-20T12:30:15.000Z",
        description: "Deposit from Jane Doe",
        amount: {
          value: "100.00",
          currency: "GBP",
        },
        type: "CREDIT",
        reference: "REF-0987654321",
        metadata: {
          source: bank,
        },
      },
    ];
  
    return mockTransactions;
  }
  
  export const getBanksTransactions = (req: Request, res: Response) => {
    const { source } = req.query;
    let transactions: TransactionDataType[] = [];
  
    if (source) {
      transactions = getTransactionsFromBank(source.toString());
    } else {
      transactions = [
        ...getTransactionsFromBank("monzo"),
        ...getTransactionsFromBank("sterling"),
        ...getTransactionsFromBank("revolut"),
      ];
    }
  
    const mappedTransactions = transactions.map((transaction) => ({
      id: transaction.id,
      created: transaction.created,
      description: transaction.description,
      amount: {
        value: transaction.amount.value,
        currency: transaction.amount.currency,
      },
      type: transaction.type,
      reference: transaction.reference,
      metadata: {
        source: transaction.metadata.source,
      },
    }));
  
    res.json({ transactions: mappedTransactions });
  };













  // export const getBankTransactions = async(req: Request, res: Response) => {
  //   const source =  req.query.source;

  //   if(!source) {
  //     return res.status(400).json({ error: 'Missing source parameters'});
  //   }

  //   let transactions: TransactionDataType[] = [];

  //   try {
  //     switch (source) {
  //       case "sterling":
  //         // eslint-disable-next-line no-case-declarations
  //         const sterlingResponse: BankAPIResponse = await axios.get(
  //           "http://localhost:5000/api/sterling");
  //         transactions = sterlingResponse.data.transactions;
  //         break;
  //       case "monzo":
  //         // eslint-disable-next-line no-case-declarations
  //         const monzoResponse: BankAPIResponse = await axios.get(
  //           "http://localhost:5000/api/monzo"
  //         );
  //         transactions = monzoResponse.data.transactions;
  //         break;
  //       case "revolut":
  //         // eslint-disable-next-line no-case-declarations
  //         const revolutResponse: BankAPIResponse = await axios.get(
  //           "http://localhost:5000/api/revolut"
  //         );
  //         transactions = revolutResponse.data.transactions;
  //         break;
  //       default:
  //         return res.status(400).json({ error: "Invalid source parameter" });
  //     }

  //     const mappedTransactions = transactions.map((transaction) => ({
  //       id: transaction.id,
  //       created: transaction.created,
  //       description: transaction.description,
  //       amount: transaction.amount,
  //       type: transaction.type,
  //       reference: transaction.reference,
  //       metadata: transaction.metadata,
  //     }));

  //     return res.json({ transactions: mappedTransactions });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // }

