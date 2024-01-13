import * as Yup from 'yup'


export const createCategorySchema = Yup.object({
    name: Yup.string().required("نام دسته بندی الزامی است."),
    parent_id: Yup.number("لطفا مقدار عددی برای parent_id وارد کنید.")
})