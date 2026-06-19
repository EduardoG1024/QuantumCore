import express from "express"
import fs from 'fs';
import { QuantumErrors } from "../errors/QuantumErrors.js";

export class QuantumControllers {

    constructor() {}

    static loginUser = async (req, res) => {
        const {email, password} = req.body;
        
        return res.status(200).json({
            RITA: 'Login Exitoso!',
            message: `El Usuario ha Iniciado sesión`,
            validation: true,
        });
    }

    static BringDocuments = async (req, res) => {
        const files = await fetch('http://localhost:3001/dashboard/docs')
        const resp = await files.json();

        return res.status(202).json({
            message: 'Archivos Almacenados',
            files: resp.files
        });
    }

    static GenerateDocuments = (req, res) => {
        const user = req.session.user;
        if (!user || typeof(user) !== 'string') {
            return res.status(401).json({
                message: 'UNAUTHORIZED USER',
                validation: false,
            })
        }
        const files = fs.readdirSync('docs');

        return res.status(202).json({
            message: 'User Validation Correct',
            files: files,
        });
    }

    static UploadFile = (req, res) => {
        const upload = req.file;
        console.log(upload);

        return res.status(202).json({
            message: 'Archivo Guardado!',
            //path: req.file.path,
        });
    }

    static getUploads = (req, res) => {
        return res.status(202).json({
            message: 'Archivo Guardado!',
            //path: req.file.path,
        });
    }

    static DeleteFolder = (req, res) => {
        const files = fs.readdirSync('uploads');
        const deleteDir = req.params.DirName;
        if (!files.includes(deleteDir)) return res.status(404).json({message: 'Carpeta no Encontrada'});

        fs.rmSync(`uploads/${deleteDir}`, {recursive: true});
        return res.status(202).json({message: `se elimino la Carpeta: ${deleteDir}`});
    }
}