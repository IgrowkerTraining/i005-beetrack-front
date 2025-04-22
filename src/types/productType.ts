
export interface Product {
    id: string;
    barcode: string;
    name: string;
    stock: number;
    description: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
    costPrice: string;
    imagePath: string;
    salesPrice: string;
    status: string;
    stock_min: number;
    stock_optimus: number;
    cloudinary_id: string;
    alerts: boolean
}

export interface NewProduct {
    barcode: string;
    name: string;
    salesPrice: string;
    costPrice: string;
    stock: number;
    stock_min: number;
    stock_optimus: number;
    alerts: boolean;
    description: string;
    file: File;
}

export interface FetchProduct {
    status: string;
    data: {
        items: Product[],
        total: number
    };
}

export interface FetchProductById {
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