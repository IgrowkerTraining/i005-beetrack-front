
export interface Product {
    id: string;
    description: string;
    barcode: string;
    name: string;
    costPrice: string;
    salesPrice:string;
    stock: number;
    stock_min: number;
    stock_optimus: number;
    imagePath: string;
    alerts: boolean;
    file: File;
}

export interface FetchProduct {
    status: string;
    data: Product[];
}

export interface FetchProductById {
    status: string;
    data: Product;
}

export interface AddProductResponse {
    status: string;
    data: Product;
}

export interface UpdateProductResponse {
    status: string;
    data: Product;
};

export interface StockAlert {
    id: string;
    message: string;
}


export interface SaleItem {
    id: string;
    barcode: string;
    name: string;
    price: number;
}


export interface Sale {
    id: string;
    items: SaleItem[];
    total: number;
    date: string;
}

export type NewProduct = Omit<Product, 'id' | 'imagePath'>;