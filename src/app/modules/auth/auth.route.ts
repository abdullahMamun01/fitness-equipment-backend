import express from 'express'

import { authController } from './auth.controller'
import { validateRequest } from '../../middleware/validateRequest'
import { loginValidationSchema } from './auth.validation'
import { userController } from '../user/user.controller'
import userRegisterValidationSchema from '../user/user.validation'

const router = express.Router()


router.post('/login', validateRequest(loginValidationSchema), authController.login)
router.post(
    '/signup',
    validateRequest(userRegisterValidationSchema),
    userController.signupController,
);

export const authRoutes = router





