import express from 'express';
import { authoRization } from '../../middleware/authoRization';
import { createCarWashServiceValidationSchema, update_CarWashService_ValidationSchema } from './carWashService.validation';
import { validateRequest } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constants';
import { CarWashServiceController } from './carWashService.controller';
import { SlotController } from '../slot/slot.controlle';
import { slotValidationSchema } from '../slot/solot.validation';

const router = express.Router();

//get all the  car washing service
router.get('/', CarWashServiceController.getAllCarWashServices);
//get the single car washing service by id
router.get('/:serviceId', CarWashServiceController.getCarWashServiceById);

//updating the single car washing service by id
router.put(
  '/:serviceId',
  validateRequest(update_CarWashService_ValidationSchema),
  authoRization(USER_ROLE.admin),
  CarWashServiceController.updateCarWashService,
);
//create slots
router.post(
  '/slots',
  validateRequest(slotValidationSchema),
  authoRization(USER_ROLE.admin),
  SlotController.createSlots,
);

//create new car washing service
router.post(
  '/',
  validateRequest(createCarWashServiceValidationSchema),
  authoRization(USER_ROLE.admin),
  CarWashServiceController.createCarWashService,
);
router.delete(
  '/:serviceId',
  authoRization(USER_ROLE.admin),
  CarWashServiceController.deleteCarWashService,
);



export const servicesRoutes = router;
