import Category from "../models/categoryModel.js";

const createCategories = (categories, parentId = 0) => {
    const categoryList = [];
    let category;
    if (parentId == 0) {
        category = categories.filter((cat) => cat.parent_id == 0);
    } else {
        category = categories.filter((cat) => cat.parent_id == parentId);
    }
    for (let cate of category) {
        categoryList.push({
            id: cate.id,
            name: cate.name,
            parent_id: cate.parent_id,
            children: createCategories(categories, cate.id),
        });
    }
    return categoryList;
}

export const getAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.findAll()
        const categoryList = createCategories(categories);
        res.status(200).json({
            success: true,
            categoryList
        })
    } catch (err) {
        next(err)
    }
}

export const createCategory = async (req, res, next) => {
    const {name, parent_id} = req.body
    try {
        const categoryObject = {name}

        if (parent_id) {
            categoryObject.parent_id = parent_id
        }

        await Category.create(categoryObject)

        res.status(201).json({
            success: true,
            message: `دسته بندی ${name} با موفقیت ایجاد شد.`
        })
    } catch (err) {
        next(err)
    }
}
export const updateCategory = async (req, res, next) => {
    const {id} = req.params
    const {name, parent_id} = req.body
    try {
        const categoryObject = {name}

        if (parent_id) {
            categoryObject.parent_id = parent_id
        }
        await Category.update(categoryObject, {where: {id}})
        res.status(200).json({
            success: true,
            message: "ویرایش دسته بندی موفقیت آمیز بود."
        })
    } catch (err) {
        next(err)
    }
}
export const deleteCategory = async (req, res, next) => {
    const {id} = req.params

    try {
        const category = await Category.findByPk(id)
        if (!category) {
            const error = new Error("دسته بندی با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }
        await Category.destroy({
            where: {id}
        })

        res.status(200).json({
                success: true,
                message: "دسته بندی مورد نظر حذف شد."
            }
        )
    } catch (err) {
        next(err)
    }
}