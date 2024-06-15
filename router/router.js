import { Router } from "express";
import { fetchit } from "../controllers/fetching.js";
import { regions } from "../controllers/regions.js";
import { dashData } from "../controllers/dashdata.js";
import { barData, pieData } from "../controllers/piedata.js";


const router = Router()

router.route('/data').get(fetchit)
router.route('/regions').post(regions)
router.route('/dashboard').get(dashData)
router.route('/piechart').get(pieData)
router.route('/barchart').get(barData)

export default router