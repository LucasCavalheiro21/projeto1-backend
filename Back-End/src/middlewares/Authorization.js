import {request } from "express";
import jwt from "jsonwebtoken";

export default function authorization(request, response, next) {
    const { authorization } = request.headers;

    try {
        if (!authorization) {
            return response.status(401).json({ error: "Token de autenticação ausente :(" });
        }
        const { isAdmin } = jwt.verify(authorization, process.env.SECRET_JWT);
        if (!isAdmin) {
            return response.status(403).json({ error: "Acesso negado :(" });
        }
        return next();
    }catch(error){
        return response.status(401).json({ error: "Token de autenticação inválido :(" });
    }

}