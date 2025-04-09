
export interface Product {
    id: number;
    barcode: string;
    name: string;
    price: number;
    stock: number;
}


export interface StockAlert {
    id: number;
    message: string;
}

 
export type NewProduct = Omit<Product, 'id'>;