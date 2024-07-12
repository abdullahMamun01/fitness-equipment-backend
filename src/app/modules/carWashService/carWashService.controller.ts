import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { CarWashService } from "./carWashService.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCarWashService = catchAsync(async (req: Request, res: Response) => {
  const serviceBody = req.body;
  const service = await CarWashService.createCarWashServiceToDB(serviceBody);
  sendResponse(res, {
    message: 'Service created successfully',
    success: true,
    statusCode: httpStatus.OK,
    data: service,
  });
});

const getAllCarWashServices = catchAsync(async (req: Request, res: Response) => {
  const services = await CarWashService.getAllServiceFromDb();
  sendResponse(res, {
    message: 'Services retrieved successfully',
    success: true,
    statusCode: httpStatus.OK,
    data: services,
  });
});

const getCarWashServiceById = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId;
  const service = await CarWashService.getSingleServiceFromDb(serviceId);
  sendResponse(res, {
    message: 'Service retrieved successfully',
    success: true,
    statusCode: httpStatus.OK,
    data: service,
  });
});

const updateCarWashService = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId;
  const service = await CarWashService.updateService(serviceId, req.body);
  sendResponse(res, {
    message: 'Service updated successfully',
    success: true,
    statusCode: httpStatus.OK,
    data: service,
  });
});


const deleteCarWashService = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId;
  const service = await CarWashService.deleteCarWashServiceFromDB(serviceId);
  sendResponse(res, {
    message: 'Service deleted successfully',
    success: true,
    statusCode: httpStatus.OK,
    data: service,
  });
});

export const CarWashServiceController = {
  createCarWashService,
  getAllCarWashServices,
  getCarWashServiceById,
  updateCarWashService,
  deleteCarWashService
};
