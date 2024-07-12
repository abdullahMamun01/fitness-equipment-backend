import { model, Schema } from 'mongoose';
import { TSlot } from './slot.interface';


const slotSchema = new Schema<TSlot>({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'CarWashService',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  isBooked: {
    type: String,
    required: false,
  },
});

// Creating the Slot model
export const SlotModel = model<TSlot>('Slot', slotSchema);
