import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export function validateSchema(schema : Schema) {
    return (req : Request, res : Response, next : NextFunction) => {
        const schemaValidation = schema.validate(req.body, { abortEarly: false });

        if (schemaValidation.error) {
            const message = schemaValidation.error.details.map((error) => {
                if (error.context?.message) {
                    console.error(error.context.message);
                    return error.context.message;
                } else {
                    console.error(error.message);
                    return error.message;
                }
            });
            throw {
                type: "Not Acceptable",
                message
            };
        };

        next();
    };
};