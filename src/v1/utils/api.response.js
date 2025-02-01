const successResponse = async (status, statusCode, bodyData) => {
    try {
        const successResponseObject = {
            sucess: status,
            status_code: statusCode,
            body: bodyData
        };
        return successResponseObject;
    } catch (err) {
        throw err;
    }
}

module.exports={successResponse};
