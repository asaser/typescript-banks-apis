export interface TransactionDataType {
    id: string;
    created: string;
    description: string;
    amount: {
        value: string | number;
        currency: string;
    };
    type: string;
    reference: string;
    metadata: {
        source: string;
    };
}