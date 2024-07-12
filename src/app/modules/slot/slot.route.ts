import express from 'express';
import { SlotController } from './slot.controlle';


const router = express.Router();

router.get('/availability' , SlotController.getAvailableSlots )

export const slotRoutes = router;
