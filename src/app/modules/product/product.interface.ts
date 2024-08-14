import mongoose from "mongoose";

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  img: string;
  images: string[];
  stock: number;
  sku: string;
  tags: string[];
  discountedPrice: number;
  stockStatus: 'inStock' | 'outOfStock' | 'preOrder' | 'discontinued';
  weight?: number;
  dimensions?: { length: number, width: number, height: number };
  material?: string;
  color?: string;
  manufacturer?: string;
  releaseDate?: Date;

}

export type TReview = {
  userId: mongoose.Types.ObjectId, // refer to the user model
  productId: mongoose.Types.ObjectId, // refer to the product model
  review: string,
  rating: number,
  date: Date

}

export type TProductsParams =  {
  page?: number;
  limit?: number;
  search?: string;
  min?: number;
  max?: number;
  category?: string[];
}