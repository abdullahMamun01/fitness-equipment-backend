import { Router } from "express";
import { USER_ROLE } from "../user/user.constants";
import { orderController } from "./order.controller";
import { authoRization } from "../../middleware/authoRization";



const router = Router()


// router.get('/:orderId', )
router.get('/', authoRization(USER_ROLE.admin) , orderController.orderList )
router.get('/', authoRization(USER_ROLE.user) , orderController.userOrderList)
router.get('/stripe-success', authoRization(USER_ROLE.user) , orderController.confirmOrderWithStripe )

export const orderRoutes = router
