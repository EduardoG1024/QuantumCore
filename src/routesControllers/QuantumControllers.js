import express from "express"
import fs from 'fs';
import { supabase } from "../config/supabase.js";
import { RegisterKey, RegisterModel, RegisterValidation } from "../models/RegisterModel.js";

export class QuantumControllers {

    constructor() {}

    static registerUser = async (req, res) => {
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

    static loginUser = async (req, res) => {
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