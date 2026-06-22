import express from "express"
import fs from 'fs';
import path from "path";
import { __dirname } from "../QuantumCore.js";
import { supabase } from "../config/supabase.js";
import { RegisterModel, RegisterValidation } from "../models/RegisterModel.js";
import { RegisterKey } from "../middlewares/key-validator.js";

export class QuantumControllers {

    constructor() {
        this.url = 'http://localhost:3001';
    }

    static RegisterUser = async (req, res) => {
        const {email, password, key} = req.body;
        if (!email || !password || !key) return res.status(400).json({message: 'Credenciales NO Encontradas'});

        const KeyValidation = new RegisterKey(key);
        if (KeyValidation.status === false) return res.status(401).json({message: 'Clave de Registro Incorrecta'});

        const UserValidation = new RegisterValidation(email, password);
        if (UserValidation.status === false) 
            return res.status(400).json({
            message: 'Crendenciales NO Seguras',
            key: 'Clave Correcta',
            email: 'Asegurate que sea un Correo Valido',
            password: 'Password debe ser Mayor a 8 Digitos'
        });

        const UserResult = new RegisterModel(email, password);

        const {error} = await supabase
        .from('users')
        .insert({
            email: UserResult.email,
            password: UserResult.password,
            role: UserResult.role,
            key: UserResult.key,
            created_at: UserResult.created_at,
        });
        if (error) return res.status(400).json({message: 'Ocurrió un Error al Registar las Credenciales', error: error});

        return res.status(202).json({
            message: 'Datos Correctos',
            email: email,
            password_length: password.length,
            validation: true,
        });
    }

    static LoginUser = async (req, res) => {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({message: 'Credenciales NO Encontradas'});

        const {data, error} = await supabase
        .from('users')
        .select('email, password, role')
        .eq('email', email)
        .eq('password', password)
        .single()
        if (error) return res.status(401).json({message: 'Credenciales NO Validas'});

        if(!data.email || !data.password) return res.status(401).json({message: 'Credenciales Incorrectas'});
        req.session.user = {
            user: data.email,
            role: data.role,
        };

        return res.status(200).json({
            QuantumCore: 'Login Exitoso!',
            message: `El Usuario ha Iniciado sesión`,
            email: data.email,
            validation: true,
            role: req.session.user.role,
        });
    }

    static DownloadDocument = async (req, res) => {
        const {user, role} = req.session.user || {user: undefined, role: undefined};
        if (!user || !role) return res.status(403).json({message: 'Acceso Denegado'});
        const RequestFile = req.params.doc;
        
        const Files = fs.readdirSync('docs');
        if (!Files.includes(RequestFile)) 
            return res.status(404).json({message: 'Archivo NO Encontrado'});

        const File = path.join(__dirname, '..', 'docs', RequestFile);
        res.download(File);
    }

    static GenerateDocuments = (req, res) => {
        const {user, role} = req.session.user || {user: 'none', role: 'none'};
        if (!user || !role || role !== 'admin') {
            return res.status(401).json({
                message: 'UNAUTHORIZED USER',
                email: user,
                role: role,
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

        return res.status(202).json({
            message: 'Archivo Guardado!',
            upload: upload,
        });
    }

    static GetUploads = (req, res) => {
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

    static ErrorDirect = (req, res) => {
        const userExist = req.session.user || {user: false, role: false};
        let user = true;
        if (userExist?.user === false) user = false;

        return res.status(500).json({
            QuantumCore: 'ERROR',
            message: 'Ocurrió un Error en el Servidor Regresa al Inicio...',
            usuario: user,
            report: 'El Error Fue Reportado.',
        })
    }
}