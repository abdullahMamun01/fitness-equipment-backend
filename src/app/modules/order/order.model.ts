import mongoose, { Schema } from 'mongoose';
import { TAddress, TOrder, TOrderProduct, TPayment } from './order.interface';


// Address Schema
const AddressSchema = new Schema<TAddress>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  street: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
});

// Payment Schema
const PaymentSchema = new Schema<TPayment>({
  method: { type: String, required: true },
  transactionId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], required: true }
});

// Product Schema
const ProductSchema = new Schema<TOrderProduct>({
  name: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

// Order Schema
const OrderSchema = new Schema<TOrder>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [ProductSchema], //get from cash or online payment api
  totalAmount: { type: Number, required: true },
  paymentInfo: { type: PaymentSchema, required: true },
  shippingAddress: { type: AddressSchema, required: true },
  status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending', required: true },
  deliveryTime: { type: String, required: true },
  orderDate: { type: Date, default: Date.now, required: true },
  deliveryDate: { type: Date }
});

const OrderModel =  mongoose.model<TOrder>('Order', OrderSchema);

export default OrderModel
