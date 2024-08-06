import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import  { userProfileUpdateValidationSchema } from './user.validation';


const router = express.Router();



router.patch(
  '/',
  validateRequest(userProfileUpdateValidationSchema.partial()),
  userController.updateProfile,
);

export const userRoutes = router;
