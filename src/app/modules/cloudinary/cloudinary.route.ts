import { Router } from "express";
import { cloudinaryController } from "./cloudinary.controller";
import { authoRization } from "../../middleware/authoRization";



const router = Router()


router.post('/upload', authoRization('user' ,'admin'), cloudinaryController.uploadImage )


export const uploadImageRoutes = router
