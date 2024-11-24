import { NextFunction, Request, Response } from "express";

import { errorType } from "../utils/errorTypeUtils.js";

export function errorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
): Response {
    console.error(error);

    const errorThrow = errorType(error);

    let error_code = "";
    if (errorThrow.status == 404) {
        error_code = "DRIVER_NOT_FOUND"
    } else if(errorThrow.status == 406) {
        error_code = "INVALID_DISTANCE"
    } else {
        error_code = "INVALID_DATA"
    }

    const errorBody = {
        error_code,
        error_description: errorThrow.message
    };

    return res.status(errorThrow.status).send(errorBody);
};