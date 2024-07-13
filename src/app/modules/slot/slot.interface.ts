import { Types } from "mongoose";

export type TSlot = {
    service: Types.ObjectId , // refer to the car washing service model
    date: string,
    startTime: string ,
    endTime: string ,
    isBooked?: 'booked' | 'available'
}

export type TSlotQUery = {
    date?: string ,
    serviceId?:string
}
