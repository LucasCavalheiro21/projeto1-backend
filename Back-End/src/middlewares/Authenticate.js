import {request } from "express";
import jwt from "jsonwebtoken";

export default function authenticate(request, response, next) {
    const { authorization } = request.headers;

    try {
        if (!authorization) {
            return response.status(401).json({ error: "Token de autenticação ausente :(" });
        }
        const { id } = jwt.verify(authorization, process.env.SECRET_JWT);
        if (!id) {
            return response.status(401).json({ error: "Token de autenticação inválido :(" });
        }
        return next();
    }catch(error){
        return response.status(401).json({ error: "Token de autenticação inválido :(" });
    }

}