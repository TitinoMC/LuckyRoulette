import { Router } from "express";
import { get_data_winners } from "../controllers/dataWinners.js";

const router = Router();

router.get( '/', get_data_winners );

export default router;