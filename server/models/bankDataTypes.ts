export interface MonzoDataType {
    id: string;
    created: string;
    description: string;
    amount: number;
    currency: string;
    metadata: {
        reference: string;
    };
}

export interface RevolutDataType {
    id: string;
    created_at: string;
    completed_at: string;
    state: "COMPLETED" | "PENDING" | "FAILURE";
    amount: {
        value: string;
        currency: string;
    };
    merchant: null;
    counterparty: {
        id: string;
        name: string;
    };
    reference: string;
}

export interface SterlingDataType {
    id: string;
    currency: string;
    amount: string;
    direction: "IN" | "OUT";
    narrative: string;
    created: string;
    reference: string;
}