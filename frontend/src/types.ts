export interface Client {
    id: string;
    name: string;
    email: string;
}

export interface Payment {
    id: string;
    clientId: string;
    amount: number;
    date: string;
}

export interface ExchangeRate {
    rate: number;
}