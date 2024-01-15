import express from "express";
//controllers
import {createAdmin, deleteAdmin, getAllAdmins} from "../controllers/adminController.js";

//middleware
import {validation} from "../middlewares/validation.js";

//schemas
import {createAdminSchema} from "../schemas/adminSchemas.js";

const router = express.Router()


router.get("/", getAllAdmins)
router.post("/", validation(createAdminSchema), createAdmin)
router.delete("/:id", deleteAdmin)
export default router