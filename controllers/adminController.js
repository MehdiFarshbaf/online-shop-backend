import Admin from "../models/adminModel.js";
import {sendErrorResponse, sendSuccessResponse} from "../helper/functions.js";

export const getAllAdmins = async (req, res, next) => {
    try {
        const admins = await Admin.findAll()
        sendSuccessResponse(res, 200, true, null, admins)
    } catch (err) {
        next(err)
    }
}

export const createAdmin = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const admin = await Admin.findOne({where: {email}})
        if (admin) {
            sendErrorResponse(422, "کاربری با این ایمیل وجود دارد.")
        }
        const newAdmin = await Admin.create({email, password})
        sendSuccessResponse(res, 201, true, "مدیر با موفقیت ایجاد شد.", newAdmin)
    } catch (err) {
        next(err)
    }
}

export const deleteAdmin = async (req, res, next) => {
    const {id} = req.body
    try {
        const admin = await Admin.findByPk(id)
        if (!admin) {
            sendErrorResponse(404, "مدیری با این شناسه یافت نشد.")
        }
        await Admin.destroy({where: {id}})
        sendSuccessResponse(res, 200, true, "مدیر با موفقیت حذف شد.", admin)
    } catch (err) {
        next(err)
    }
}
