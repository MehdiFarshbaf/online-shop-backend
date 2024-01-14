export const sendSuccessResponse = (res, statusCode, success, message = null, data = undefined) => res.status(statusCode).json({
    success,
    message: !message ? 'عملیات موفقیت آمیز بود.' : message,
    data
});

// export const sendErrorResponse = (res, code, errorMessage, e = null) => res.status(code).send({
//     status: 'error',
//     error: errorMessage,
//     e: e?.toString(),
// });

export const sendErrorResponse = (statusCode, message) => {
    const error = new Error(message)
    error.statusCode = statusCode
    throw error
}