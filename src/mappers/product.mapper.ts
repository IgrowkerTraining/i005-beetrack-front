import { Product } from "@/types/productType";
import { SaleItem } from "@/types/salesTypes";

export function mapProductToSaleItem(product: Product): SaleItem {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    unitPrice: product.price,
    quantity: 1,
    totalPrice: product.price,
    imagePath: "", 
  };
}

export function mapProductsToSaleItems(products: Product[]): SaleItem[] {
  return products.map(mapProductToSaleItem);
}

