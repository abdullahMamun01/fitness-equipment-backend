import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { convertToTBooking } from "./booking.utils";
import { BookingService } from "./booking.service";
import { Request, Response } from "express";

// Controller for booking a slot
const bookSlot = catchAsync(async (req: Request, res: Response) => {
    const body = req.body;
    const bookingData = convertToTBooking(body, req.user.userId);
    const booking = await BookingService.bookSlotIntoDB(bookingData);

    sendResponse(res, {
        success: true,
        message: 'Slot booked successfully',
        statusCode: httpStatus.OK,
        data: booking,
    });
});

// Controller for retrieving all bookings
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const bookingList = await BookingService.getAllBookingsFromDB();
    sendResponse(res, {
        success: true,
        message: 'All bookings retrieved successfully',
        statusCode: httpStatus.OK,
        data: bookingList,
    });
});

// Controller for retrieving bookings for the authenticated user
const getUserBookings = catchAsync(async (req: Request, res: Response) => {
    const bookingList = await BookingService.getBookingsByUserFromDB(req.user.userId);
    sendResponse(res, {
        success: true,
        message: 'User bookings retrieved successfully',
        statusCode: httpStatus.OK,
        data: bookingList,
    });
});

export const BookingController = {
    bookSlot,
    getAllBookings,
    getUserBookings,
};
