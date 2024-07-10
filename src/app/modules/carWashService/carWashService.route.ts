import express from 'express';
import { authoRization } from '../../middleware/authoRization';
import { carWashServiceValidationSchema } from './carWashService.validation';
import { validateRequest } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constants';
import { CarWashServiceController } from './carWashService.controller';

const router = express.Router();

//get the single car washing service by id
router.get(
  '/:serviceId',
  validateRequest(carWashServiceValidationSchema),
  authoRization(USER_ROLE.admin),
  CarWashServiceController.getCarWashServiceById,
);

//updating the single car washing service by id
router.put(
  '/:serviceId',
  validateRequest(carWashServiceValidationSchema),
  authoRization(USER_ROLE.admin),
  CarWashServiceController.updateCarWashService,
);
//create new car washing service
router.post(
  '/',
  validateRequest(carWashServiceValidationSchema),
  authoRization(USER_ROLE.admin),
  CarWashServiceController.createCarWashService,
);
//get all the  car washing service
router.get(
  '/',
  validateRequest(carWashServiceValidationSchema),
  authoRization(USER_ROLE.admin),
  CarWashServiceController.getAllCarWashServices,
);

export const servicesRoutes = router;
