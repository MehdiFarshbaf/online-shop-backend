import * as Yup from 'yup'

export const createPermissionSchema = Yup.object({
    key: Yup.string().required("کلید برای مجوز الزامی است."),
    description: Yup.string().required("توضیحات برای مجوز الزامی است.")
})