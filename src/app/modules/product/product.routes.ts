import { Router } from "express";
import { productController } from "./product.controller";
import { validateRequest } from "../../middleware/validateRequest";
import ProductValidationSchema from "./product.validation";
import { authoRization } from "../../middleware/authoRization";
import { USER_ROLE } from "../user/user.constants";


const router = Router()


router.get('/', productController.getAllProduct)
router.get('/categories', productController.getProductCategoriesList)
router.get('/:productId/related-products', productController.getRelatedProduct)

router.get('/:productId', productController.getSingleProduct)

router.post('/', validateRequest(ProductValidationSchema), authoRization(USER_ROLE.admin), productController.addProduct)
router.patch('/:productId', validateRequest(ProductValidationSchema.partial()), authoRization(USER_ROLE.admin), productController.updateProduct)
router.delete('/:productId', authoRization(USER_ROLE.admin), productController.deleteProduct)


export const productRoutes = router
