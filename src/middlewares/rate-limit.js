import express from "express";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const limiterUser = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 20,
    statusCode: 429,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: 'Haz Alcanzado el Limite de Peticiones por Usuario, Intenta mas Tarde',

    keyGenerator: (req) => {
        return req.session?.user?.user || ipKeyGenerator(req);
    }
});

export const limiterIP = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 15,
    statusCode: 429,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: 'Usuario NO Registrado, Intente mas Tarde',
})