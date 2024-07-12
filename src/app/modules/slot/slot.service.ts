import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TSlot, TSlotQUery } from './slot.interface';
import { SlotModel } from './slot.model';
import { timeFormat } from './slot.utils';

const createSlotIntoDb = async (payload: TSlot) => {
  //check the range already exist
  const conflictSlot = await SlotModel.find({
    service: payload.service,
    date: payload.date,
    $or: [
      { startTime: { $lt: payload.endTime, $gte: payload.startTime } },
      { endTime: { $gt: payload.startTime, $lte: payload.endTime } },
    ],
  });
  /* 

   if startTime <= newEndTime && newStartTime <= endTime
  
  */
  // console.log(conflictSlot)
  if (conflictSlot.length > 0) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Slot(s) already exist for the specified time range.',
    );
  }
  //create the clot for range
  const newStartTime = Math.floor(
    new Date(`1970-01-01T${payload.startTime}`).getTime(),
  );
  const newEndTime = Math.floor(
    new Date(`1970-01-01T${payload.endTime}`).getTime(),
  );
  if (newStartTime === newEndTime || newStartTime > newEndTime) {
    throw new AppError(
      httpStatus.CONFLICT,
      'invalid the specified time range.',
    );
  }

  const onHour = 60 * 60 * 1000;
  const slots: TSlot[] = [];

  for (let time = newStartTime; time < newEndTime; time += onHour) {
    const st = new Date(time);
    const et = new Date(time + onHour);
    const startTime = timeFormat(st);
    const endTime = timeFormat(et);

    const slot: TSlot = {
      service: payload.service,
      date: payload.date,
      startTime: startTime,
      endTime: endTime,
      isBooked: 'available',
    };
    slots.push(slot);
  }

  return await SlotModel.insertMany(slots);
};

const availabilitySlotIntoDB = async (query: TSlotQUery) => {
  if (query.serviceId) {
    const slot = await SlotModel.findOne({ service: query.serviceId });
    if (!slot)
      throw new AppError(httpStatus.NOT_FOUND, 'this id do not exists!');
  }

  const search: { date?: string; service?: string } = {};
  if (query.date) {
    search.date = query.date;
  }
  if (query.serviceId) {
    search.service = query.serviceId;
  }

  const slot = await SlotModel.find({ isBooked: 'available', ...search }).populate('service');
  return slot;
};

export const SlotService = {
  createSlotIntoDb,
  availabilitySlotIntoDB,
};
