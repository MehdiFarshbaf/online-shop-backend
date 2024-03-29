import express from 'express'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import db from "./config/database.js";
import {defaultAdmin} from "./config/appConfig.js";

// import middlewares
import {header} from "./middlewares/headers.js";
import {errorHandler} from "./middlewares/errors.js";

// import routes
import brandRoutes from "./routes/brandRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import Admin from "./models/adminModel.js";
import permissionRoutes from "./routes/permissionRoutes.js";


// Load Config
dotenv.config()

const app = new express()

// BodyParser & headers
app.use(express.json())
app.use(fileUpload())
app.use(header)

// Static Folder
app.use(express.static("public"))

// connect database
try {
    await db.authenticate()
    console.log("database is connected")
    await db.sync()
    const admin = await Admin.build(defaultAdmin)
    await admin.save()
} catch (err) {
    console.log(err)
}

// routes
app.use("/api/brand", brandRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/faq", faqRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/permission", permissionRoutes)

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
