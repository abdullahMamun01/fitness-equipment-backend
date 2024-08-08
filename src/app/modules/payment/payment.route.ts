import { Router } from "express";
import { USER_ROLE } from "../user/user.constants";
import { authoRization } from "../../middleware/authoRization";
import { paymentController } from "./payment.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { paymentValidationSchema } from "./payment.validation";

/* 
api/payments/stripe
*/

const router = Router()


router.post('/stripe/confirm-payment',
    validateRequest(paymentValidationSchema),
    authoRization(USER_ROLE.user),
    paymentController.createStripeCheckoutSession
)


export const paymentRoutes = router
