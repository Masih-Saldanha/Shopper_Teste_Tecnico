import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export function validateSchema(schema : Schema) {
    return (req : Request, res : Response, next : NextFunction) => {
        const schemaValidation = schema.validate(req.body, { abortEarly: false });

        if (schemaValidation.error) {
            let message = "";
            schemaValidation.error.details.forEach((error) => {
                if (error.context?.message) {
                    console.error("error.context.message: ", error.context.message);
                    message += error.context.message + "\n";
                } else {
                    console.error("error.message: ", error.message);
                    message += error.message + "\n";
                }
            });
            throw {
                type: "Bad Request",
                message
            };
        };

        next();
    };
};