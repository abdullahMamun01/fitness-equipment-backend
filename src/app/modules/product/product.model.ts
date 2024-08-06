
import { TProduct } from "./product.interface";
import mongoose , { Schema } from "mongoose";

const ProductSchema = new Schema<TProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    img: { type: String, required: true },
    images: { type: [String], required: true },
    stock: { type: Number, required: true },
    sku: { type: String, required: true },
    tags: { type: [String], required: true },
    discountedPrice: { type: Number, required: true },
    stockStatus: { type: String, enum: ['inStock', 'outOfStock', 'preOrder', 'discontinued'], required: true },
    weight: { type: Number },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number }
    },
    material: { type: String },
    color: { type: String },
    manufacturer: { type: String },
    releaseDate: { type: Date }
  });
  
  const ProductModel = mongoose.model<TProduct>('Product', ProductSchema);
  
  export default ProductModel;