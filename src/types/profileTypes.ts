export interface Profile {
    id: string;
    name: string;
    last_name: string;
    birthdate: Date;
    email: string;
    status: 'ACTIVE' | 'BLOCKED';
    createdAt: Date;
    updatedAt: Date;
    store: Store; // Un store, no un array
}

export interface Store {
    id: string;
    name: string;
    tel: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
}