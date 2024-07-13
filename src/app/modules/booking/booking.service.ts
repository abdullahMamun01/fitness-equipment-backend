import { CONFLICT, NOT_FOUND } from 'http-status';
import AppError from '../../error/AppError';
import UserModel from '../user/user.model';
import { TBooking } from './booking.interface';
import { CarwashModel } from '../carWashService/carWashService.models';
import { SlotModel } from '../slot/slot.model';
import { BookingModel } from './booking.model';

const bookSlotIntoDB = async (payload: TBooking) => {
  const [user, service, slot] = await Promise.all([
    UserModel.findById(payload.customer).exec(),
    CarwashModel.findById(payload.service).exec(),
    SlotModel.findById(payload.slot).exec(),
  ]);

  if (!user) {
    throw new AppError(NOT_FOUND, 'User not found');
  }

  if (!service) {
    throw new AppError(NOT_FOUND, 'Service not found');
  }

  if (!slot) {
    throw new AppError(NOT_FOUND, 'Slot not found');
  }
  if (slot.isBooked === 'booked') {
    throw new AppError(CONFLICT, 'The slot is already booked! ');
  }

  const booking = (await BookingModel.create(payload)).populate(
    'customer service slot',
  );
  await SlotModel.findByIdAndUpdate(
    payload.slot,
    { isBooked: 'booked' },
    { new: true },
  );
  return booking;
};

const getAllBookingsFromDB = async () => {
  return await BookingModel.find();
};
const getBookingsByUserFromDB = async (userId: string) => {
  const bookings = await BookingModel.find({customer: userId });
  return bookings;
};

export const BookingService = {
  bookSlotIntoDB,
  getAllBookingsFromDB,
  getBookingsByUserFromDB,
};
