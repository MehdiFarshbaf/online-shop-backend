import * as Yup from 'yup'

const MAX_FILE_SIZE = 102400 * 10 * 1; //100KB

const validFileExtensions = {image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp']};

function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

export const createBrandSchema = Yup.object({
    name: Yup.string().required("نام برند الزامی است.").min(3),
    color: Yup.string().required("رنگ برند الزامی است.").min(3),
    // image: Yup
    //     .mixed()
    //     .required("انتخاب لوگو برای برند الزامی است.")
    //     .test("is-valid-type", "نوع عکس معتبر نمی باشد.",
    //         value => isValidFileType(value && value?.name.toLowerCase(), "image"))
    //     .test("is-valid-size", "تصویر برند نباید بیشتر از یک مگابایت باشد.",
    //         value => value && value?.size <= MAX_FILE_SIZE)
})