import mongoose, { Schema } from 'mongoose';
import { TCarWashService } from './carWashService.interface';


const CarWashServiceSchema = new Schema<TCarWashService>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const CarwashModel =  mongoose.model<TCarWashService>('CarWashService', CarWashServiceSchema);
