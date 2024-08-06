import express from 'express';
import { authoRization } from '../../middleware/authoRization';
import { MyBookingController } from './myBooking.controller';
import { USER_ROLE } from '../user/user.constants';


const router = express.Router();

//get all booking list by user
router.get(
    '/',
    authoRization(USER_ROLE.user),
    MyBookingController.getUserBookings,
  );
  
 



export const myBookingRoute = router;
