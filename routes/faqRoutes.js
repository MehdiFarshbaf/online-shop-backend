import express from "express";

//controller
import {createFAQ, deleteFAQ, getAllFAQ, updateFAQ} from "../controllers/faqController.js";

//middleware
import {validation} from "../middlewares/validation.js";

//schemas
import {faqSchemaCreate} from "../schemas/faqSchema.js";


const router = express.Router()


router.get("/", getAllFAQ)
router.post("/", validation(faqSchemaCreate), createFAQ)
router.put("/:id", validation(faqSchemaCreate), updateFAQ)
router.delete("/:id", deleteFAQ)
export default router