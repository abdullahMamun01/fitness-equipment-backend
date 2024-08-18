import { Router } from "express";
import { USER_ROLE } from "../user/user.constants";
import { orderController } from "./order.controller";
import { authoRization } from "../../middleware/authoRization";
import { validateRequest } from "../../middleware/validateRequest";
import { stripSessionIdValidation } from "./order.validation";



const router = Router()


// router.get('/:orderId', )
router.get('/', authoRization(USER_ROLE.admin) , orderController.orderList )
router.get('/', authoRization(USER_ROLE.user) , orderController.userOrderList)
router.post('/stripe-success' , validateRequest(stripSessionIdValidation), authoRization(USER_ROLE.user) , orderController.confirmOrderWithStripe )

export const orderRoutes = router
