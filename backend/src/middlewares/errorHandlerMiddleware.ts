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
    if (errorThrow.message === "Motorista não encontrado") {
        error_code = "DRIVER_NOT_FOUND"
    } else if(errorThrow.message === "Quilometragem inválida para o motorista") {
        error_code = "INVALID_DISTANCE"
    } else if(errorThrow.message === "Motorista invalido") {
        error_code = "INVALID_DRIVER"
    } else if(errorThrow.message === "Nenhum registro encontrado" || errorThrow.message === "Nenhum registro encontrado para esse motorista") {
        error_code = "NO_RIDES_FOUND"
    } else {
        error_code = "INVALID_DATA"
    }

    const errorBody = {
        error_code,
        error_description: errorThrow.message
    };

    return res.status(errorThrow.status).send(errorBody);
};