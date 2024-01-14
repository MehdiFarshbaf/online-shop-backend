import * as Yup from 'yup'

export const faqSchemaCreate = Yup.object({
    question: Yup.string().required("وارد کردن سوال الزامی است."),
    answer: Yup.string().required("وارد کردن پاسخ الزامی است.")
})