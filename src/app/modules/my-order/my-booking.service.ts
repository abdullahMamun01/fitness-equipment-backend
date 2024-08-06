import { BookingModel } from "../booking/booking.model";



const getBookingsByUserFromDB = async (userId: string) => {
    const bookings = await BookingModel.find({customer: userId });
    return bookings;
};

export const MyBookingService = {

    getBookingsByUserFromDB
  };
  