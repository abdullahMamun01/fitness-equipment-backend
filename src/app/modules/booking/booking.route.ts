import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { BookingController } from './booking.controller';
import { bookingValidationSchema } from './booking.validation';
import { authoRization } from '../../middleware/authoRization';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();

//get all booking list by user
router.get(
    '/my-bookings',
    authoRization(USER_ROLE.user),
    BookingController.getUserBookings,
  );
  
//get all booking list by admin
router.get(
  '/',
  authoRization(USER_ROLE.admin),
  BookingController.getAllBookings,
);

router.post(
  '/',
  validateRequest(bookingValidationSchema),
  authoRization(USER_ROLE.user),
  BookingController.bookSlot,
);

export const bookingRoutes = router;
