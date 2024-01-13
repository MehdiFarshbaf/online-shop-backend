import express from "express";

//controllers
import {createBrand, deleteBrand, getAllBrands, updateBrand} from "../controllers/brandController.js";

//Schemas
import {createBrandSchema} from "../schemas/brandSchemas.js";


//middlewares
import {validation} from "../middlewares/validation.js";


const router = express.Router()

// crud brand
router.get("/", getAllBrands)
router.post("/", validation(createBrandSchema), createBrand)
router.delete("/:id", deleteBrand)
router.put("/:id", validation(createBrandSchema), updateBrand)

export default router