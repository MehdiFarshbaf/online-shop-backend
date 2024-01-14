import FAQ from "../models/faqModel.js";
import {sendErrorResponse, sendSuccessResponse} from "../helper/functions.js";

export const getAllFAQ = async (req, res, next) => {
    try {
        const faqs = await FAQ.findAll()
        sendSuccessResponse(res, 200, true, false, faqs)
    } catch (err) {
        next(err)
    }
}

export const createFAQ = async (req, res, next) => {
    const {question, answer} = req.body
    try {
        const faq = await FAQ.create({question, answer})
        sendSuccessResponse(res, 201, true, "سوال متداول با موفقیت ایجاد شد.", faq)
    } catch (err) {
        next(err)
    }
}

export const updateFAQ = async (req, res, next) => {
    const {id} = req.params
    const {question, answer} = req.body

    try {
        const faq = await FAQ.findByPk(id)
        if (!faq) {
            sendErrorResponse(404, "شناسه معتبر نمی باشد.")
        }
        await FAQ.update({question, answer}, {where: {id}})
        sendSuccessResponse(res, 200, true, "ویرایش موفقیت آمیز بود.")
    } catch (err) {
        next(err)
    }
}

export const deleteFAQ = async (req, res, next) => {
    const {id} = req.params
    try {
        const faq = await FAQ.findByPk(id)
        if (!faq) {
            sendErrorResponse(404, "شناسه معتبر نمی باشد.")
        }
        await FAQ.destroy({where: {id}})
        sendSuccessResponse(res, 200, true, "عملیات حذف موفقیت آمیز بود.")
    } catch (err) {
        next(err)
    }
}