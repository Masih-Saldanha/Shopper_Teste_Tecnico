import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { throwError } from "../utils/errorTypeUtils.js";


export interface TokenData {
    id: number,
    email: string,
    iat: number
};

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();

    if (!token) {
        throwError(!token, "Unauthorized", `Token not sent`);
        return;
    }

    const userDataFromToken = jwt.verify(token, process.env.JWT_TOKEN as string, function (err, decoded) {
        if (err) throwError(true, "Unauthorized", `The token sent isn't valid`);
        else return decoded;
    });

    res.locals.userDataFromToken = userDataFromToken;
    next();
};