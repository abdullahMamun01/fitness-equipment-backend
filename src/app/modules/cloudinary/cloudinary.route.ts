import { Router } from "express";
import { cloudinaryController } from "./cloudinary.controller";



const router = Router()


router.post('/upload', cloudinaryController.uploadImage )


export const uploadImageRoutes = router
