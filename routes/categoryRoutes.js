import express from "express";

//controller
import {createCategory, deleteCategory, getAllCategory, updateCategory} from "../controllers/categoryController.js";

//schemas
import {createCategorySchema} from "../schemas/categorySchemas.js";

//middlewares
import {validation} from "../middlewares/validation.js";

const router = express.Router()

// crud category
router.get("/", getAllCategory)
router.post("/", validation(createCategorySchema), createCategory)
router.delete("/:id", deleteCategory)
router.put("/:id", validation(createCategorySchema), updateCategory)

export default router