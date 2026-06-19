import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: 'Haz Alcanzado el Limite de Peticiones, Intenta mas Tarde',
});