export default function handleError(err, validationErrors) {
    const validationErrorsBefore = validationErrors.items.length;
    let errMsg = '';

    if ( err.response && err.response.data) {
        if (err.response.data.validation_errors) {
            for (const validation_error of err.response.data.validation_errors) {
                validationErrors.add({
                    field: validation_error.field,
                    msg: validation_error.message,
                });
            }
        }
        errMsg = err.response.data.message;
    }

    if (validationErrorsBefore == validationErrors.items.length && !errMsg) {
        errMsg = 'Something went wrong'
    }
    console.log(errMsg);


    return validationErrors, errMsg;
}