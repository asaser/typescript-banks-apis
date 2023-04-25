export interface TransactionDataType {
    id: string;
    created: string;
    description: string;
    amount: {
        value: string;
        currency: string;
    };
    type: "DEBIT" | "CREDIT";
    reference: string;
    metadata: {
        source: string;
    };
}