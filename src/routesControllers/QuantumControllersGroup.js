import express from "express";
import path from "path";

export class QuantumControllersGroup {
    static statUser = true;
    static noneUser = {user: this.statUser, role: this.statUser, key: this.statUser};

    constructor() {}

    static PostToFirstGroup = async (req, res) => {
        const {user, role, key} = req.session?.user || this.noneUser;
        if (!user || !role || !key) return res.status(403).json({message: 'ACCESO DENEGADO'});
        const name = req.file.filename;
        const filePath = req.file?.path;
        if (!name) return res.status(400).json({message: 'Nombre Del Archivo Requerido, Intente de Nuevo'});

        return res.status(200).json({
            message: 'Post To First Group',
            filename: `${name}`,
            destination: filePath,
        });
    }

    static GetFirstGroupFiles = (req, res) => {
        return res.status(200).json({
            message: 'Get First Group Files',
        });
    }

    static PostToSecondGroup = (req, res) => {
        return res.status(200).json({
            message: 'Post To Second Group',
        });
    }
}