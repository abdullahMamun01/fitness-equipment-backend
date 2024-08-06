import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { MyBookingService } from "./my-booking.service";


// Controller for retrieving bookings for the authenticated user
const getUserBookings = catchAsync(async (req: Request, res: Response) => {
    const bookingList = await MyBookingService.getBookingsByUserFromDB(req.user.userId);
    sendResponse(res, {
        success: true,
        message: 'User bookings retrieved successfully',
        statusCode: httpStatus.OK,
        data: bookingList,
    });
});


export const MyBookingController = {
    getUserBookings
}