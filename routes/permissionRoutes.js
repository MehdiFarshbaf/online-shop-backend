import express from "express";

//controllers
import {
    addPermission,
    deletePermission,
    getAllPermission,
    updatePermission
} from "../controllers/permissionController.js";

//middleware
import {validation} from "../middlewares/validation.js";

//schemas
import {createPermissionSchema} from "../schemas/permissionSchemas.js";

const router = express.Router()

// crud permission
router.get("/", getAllPermission)
router.post("/", validation(createPermissionSchema), addPermission)
router.delete("/:id", deletePermission)
router.put("/:id", validation(createPermissionSchema), updatePermission)

export default router