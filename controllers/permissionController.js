import Permission from "../models/permissionModel.js";
import {sendErrorResponse, sendSuccessResponse} from "../helper/functions.js";
import PermissionModel from "../models/permissionModel.js";

export const getAllPermission = async (req, res, next) => {
    try {
        const permissions = await Permission.findAll()
        sendSuccessResponse(res, 200, true, null, permissions)
    } catch (err) {
        next(err)
    }
}

export const addPermission = async (req, res, next) => {
    const {key, description} = req.body
    try {
        const permission = await Permission.create({key, description})
        sendSuccessResponse(res, 201, true, permission)
    } catch (err) {
        next(err)
    }
}

export const updatePermission = async (req, res, next) => {
    const {id} = req.params
    const {key, description} = req.body
    try {
        const permission = await Permission.findByPk(id)

        if (!permission) sendErrorResponse(404, "مجموزی با این شناسه یافت نشد.")

        await Permission.update({key, description}, {where: {id}})
        sendSuccessResponse(res, 200, true, "ویرایش موفقیت آمیز بود.")

    } catch (err) {
        next(err)
    }
}

export const deletePermission = async (req, res, next) => {
    const {id} = req.params
    try {
        const permission = await Permission.findByPk(id)

        if (!permission) sendErrorResponse(404, "مجموزی با این شناسه یافت نشد.")

        await Permission.destroy({where: {id}})
        sendSuccessResponse(res, 200, true, `مجوز ${permission.description} با موفقیت حذف شد.`)
    } catch (err) {
        next(err)
    }
}