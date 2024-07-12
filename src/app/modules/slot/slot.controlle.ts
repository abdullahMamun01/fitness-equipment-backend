import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { SlotService } from './slot.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createSlots = catchAsync(async (req: Request, res: Response) => {
  const slotList = await SlotService.createSlotIntoDb(req.body);
  sendResponse(res, {
    message: 'Slots created successfully',
    success: true,
    statusCode: httpStatus.OK,
    data: slotList,
  });
});


const getAvailableSlots = catchAsync(async (req: Request, res: Response) => {

    const slotList = await SlotService.availabilitySlotIntoDB(req.query);
    sendResponse(res, {
      message: 'Available slots retrieved successfully',
      success: true,
      statusCode: httpStatus.OK,
      data: slotList,
    });
  });
  

export const SlotController = { createSlots ,getAvailableSlots};
