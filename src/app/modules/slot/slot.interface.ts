import { Types } from "mongoose";

export type TSlot = {
    service: Types.ObjectId , // refer to the car washing service 
    date: Date,
    startTime: string ,
    endTime: string ,
    isBooked: true
}


