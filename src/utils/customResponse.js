const customResponse = (success, message, data = null, error = null) => ({
    success,
    message,
    data,
    error,
});

export {
    customResponse
}