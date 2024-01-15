import * as Yup from 'yup'

export const createAdminSchema = Yup.object({
    email: Yup.string().required("ایمیل الزامی است.").email("ایمیل وارد شده معتبر نمی باشد.").min(8, "ایمیل نباید کمتر از 8 کاراکتر باشد. "),
    password: Yup.string().required("گذرواژه الزامی است.").min(4, "گذرواژه حداقل باید شامل 4 کاراکتر باشد")
})