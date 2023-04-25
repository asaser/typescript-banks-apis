import createHttpError from "http-errors";
import { TransactionDataType } from "../models/transactionDataTypes";
import { Request, Response, request } from 'express';


const mockedTransactions = [
    {
      id: 'tx_00009XvJjKUW8gQssn4b4L',
      created: '2022-03-21T14:16:32.000Z',
      description: 'Payment to Jane Smith',
      amount: {
        value: '-25.00',
        currency: 'EUR'
      },
      type: 'DEBIT',
      reference: 'SEPA-1234567890',
      metadata: {
        source: 'Monzo'
      }
    },
    {
      id: 'tr_1234567890',
      created_at: '2022-03-21T14:16:32.000Z',
      completed_at: '2022-03-21T14:18:32.000Z',
      state: 'COMPLETED',
      amount: {
        value: '-25.00',
        currency: 'EUR'
      },
      merchant: null,
      counterparty: {
        id: 'acc_1234567890',
        name: 'Jane Smith'
      },
      reference: 'SEPA-1234567890',
      metadata: {
        source: 'Revolut'
      }
    },
    {
        id: '6d4c34fc-94e7-4e52-8a36-9c40b102ecfc',
        created: '2022-03-21T14:16:32.000Z',
        narrative: "Payment to Jane Smith",
        direction: "OUT",
        amount: {
            value: '-25.00',
            currency: 'EUR'
        },
        type: 'DEBIT',
        reference: "SEPA-1234567890",
        metadata: {
            source: 'Sterling'
        }
    }
  ];

  export const getTransactions = (req: Request, res: Response) => {
    const transactions = mockedTransactions.map(transaction => ({
        id: transaction.id,
        created: transaction.created || transaction.created_at,
        description: transaction.description || transaction.narrative,
        amount: transaction.amount,
        type: transaction.type || transaction.state,
        reference: transaction.reference,
        metadata: {
          source: transaction.metadata.source
        }
      }));
      res.json({ transactions });
  };





//////////////////////////////////////////////////////////////////////////////////





// export const getRevolut: RequestHandler = async (req, res, next) => {
//   try {

//     if(!revolutDataBanks) {
//         throw createHttpError(404, "Revolut data not found")
//     }

//     const revolutDataTypes = revolutDataBanks as RevolutDataType[];
//     const revolutDataType = revolutDataTypes;         

//     res.status(200).json(revolutDataType)
//   } catch (error) {
//     next(error);
//   }
// }
