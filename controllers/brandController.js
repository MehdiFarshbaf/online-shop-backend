import Brand from "../models/brandModel.js";
import * as path from "path";
import * as fs from "fs";

export const getAllBrands = async (req, res, next) => {
    try {
        const brands = await Brand.findAll()
        res.status(200).json({
            success: true,
            brands
        })
    } catch (err) {
        next(err)
    }
}

export const createBrand = async (req, res, next) => {
    const {name, color} = req.body
    try {
        const file = req.files.file
        // const file = image
        const fileSize = file?.data?.length
        const ext = path.extname(file.name)
        const dateNow = Math.round(Date.now())
        const fileName = dateNow + ext
        const url = `${req.protocol}://${req.get("host")}/brands/${fileName}`
        const allowTypes = ['.jpg', '.jpeg', '.png']
        if (!allowTypes.includes(ext.toLowerCase())) {
            res.status(422).json({
                success: false,
                message: "فرمت عکس مجاز نیست."
            })
        }
        if (fileSize > 2000000) {
            res.status(422).json({
                success: false,
                message: "حجم تصویر نباید بیشتر از 2 مگابایت باشد."
            })
        }

        await file.mv(`./public/brands/${fileName}`, async (err) => {
            if (err) {
                res.status(422).json({
                    success: false,
                    message: err.message
                })
            }
            const brand = await Brand.create({name, color, image: fileName, url})

            res.status(201).json({
                success: true,
                message: `برند ${name} با موفقیت ایجاد شد.`,
            })
        })

    } catch (err) {
        next(err)
    }
}

export const updateBrand = async (req, res, next) => {
    const {id} = req.params
    const {name, color} = req.body
    try {
        let fileName = ""
        const brand = await Brand.findByPk(id)
        if (!brand) {
            const error = new Error("برندی با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }
        if (req.files === null) {
            fileName = brand.image
        } else {
            const file = req.files.file
            const fileSize = file.data.length
            const ext = path.extname(file.name)
            const dateNow = Math.round(Date.now())
            fileName = dateNow + ext
            const allowTypes = ['.jpg', '.jpeg', '.png']
            if (!allowTypes.includes(ext.toLowerCase())) {
                res.status(422).json({
                    success: false,
                    message: "فرمت عکس مجاز نیست."
                })
            }
            if (fileSize > 2000000) {
                res.status(422).json({
                    success: false,
                    message: "حجم تصویر نباید بیشتر از 2 مگابایت باشد."
                })
            }

            const filePath = `./public/brands/${brand.image}`
            fs.unlinkSync(filePath)

            await file.mv(`./public/brands/${fileName}`, async (err) => {
                if (err) {
                    res.status(422).json({
                        success: false,
                        message: err.message
                    })
                }
            })
        }

        const url = `${req.protocol}://${req.get("host")}/brands/${fileName}`

        await Brand.update({name, color, url, image: fileName}, {where: {id}})

        res.status(200).json({
            success: true,
            message: "ویرایش برند موفقیت آمیز بود."
        })

    } catch (err) {
        next(err)
    }
}
export const deleteBrand = async (req, res, next) => {
    const {id} = req.params
    try {
        const brand = await Brand.findByPk(id)
        if (!brand) {
            const error = new Error("برندی با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }

        const filePath = `./public/brands/${brand.image}`
        fs.unlinkSync(filePath)

        await Brand.destroy({
            where: {id}
        })
        res.status(200).json({
            success: true,
            message: `برند ${brand?.name} با موفقیت حذف شد.`
        })
    } catch (err) {
        next(err)
    }
}