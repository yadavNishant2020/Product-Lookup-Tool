// src/types.ts
export interface Product {
    id: number;
    title: string;
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    availabilityStatus: string;
    description: string;
    category: string;
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    returnPolicy: string;
  }