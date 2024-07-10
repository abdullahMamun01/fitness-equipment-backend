import { Types } from "mongoose"

type VehicleType =
  | "car"
  | "truck"
  | "SUV"
  | "van"
  | "motorcycle"
  | "bus"
  | "electricVehicle"
  | "hybridVehicle"
  | "bicycle"
  | "tractor";



export type TBooking = {
    customer: Types.ObjectId , // refer to the user  mongoose schema /model
    service: Types.ObjectId , // refer to the car washing service mongoose schema /model
    slot: Types.ObjectId     // refer to the slot mongoose schema /model 
    vehicleType: VehicleType,
    vehicleBrand: string ,
    manufacturingYear: number ,
    registrationPlate: string
}


/* 

{
    "name": "Car Wash",
    "description": "Professional car washing service",
    "price": 50,
    "duration": 60, // Duration in minutes
    "isDeleted": false
}

*/