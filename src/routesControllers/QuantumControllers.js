import express from "express"
import fs from 'fs';
import fsPromise from 'fs/promises';
import path from "path";
import { __dirname } from "../QuantumCore.js";
import { supabase } from "../config/supabase.js";
import { RegisterModel, RegisterValidation } from "../models/RegisterModel.js";
import { RegisterKey } from "../middlewares/key-validator.js";
import { CreateRegisterKey } from "../models/CreateKeyModel.js";
import { envs } from "../config/envs.js";

export class QuantumControllers {
    static boolUser = false;
    static nouser = {
        user: this.boolUser, 
        role: this.boolUser,
        key: this.boolUser
    }

    constructor() {}

    static RegisterKey = (req, res) => {
        const {user, role, key} = req.session?.user || this.nouser;
        
        if (!user || !role) return res.status(401).json({message: 'ACCESO DENEGADO'});
        if (key !== envs.VERO_KEY) return res.status(401).json({message: 'ACCESO DENEGADO'});

        const register = new CreateRegisterKey();
        console.log(register)
        return res.status(200).json({
            message: 'LLave de Registro',
            key: register,
            expiresIn: `10 min.`,
        })
    }

    static RegisterUser = async (req, res) => {
        const {username, password, key} = req.body;
        if (!username || !password || !key) return res.status(400).json({message: 'Credenciales NO Encontradas'});

        const KeyValidation = new RegisterKey(key);
        console.log(KeyValidation);
        if (KeyValidation.status === false) 
            return res.status(401).json({message: 'Clave de Registro Incorrecta'});

        const UserValidation = new RegisterValidation(username, password);
        if (UserValidation.status === false) 
            return res.status(400).json({
            message: 'Crendenciales NO Validas',
            key: 'Clave Correcta',
            username: 'Usuario NO Valido',
            password: 'Password debe ser Mayor a 8 Digitos'
        });

        const UserResult = new RegisterModel(username, password);

        const {error} = await supabase
        .from('users')
        .insert({
            email: UserResult.username,
            password: UserResult.password,
            role: UserResult.role,
            key: UserResult.key,
            group: UserResult.group,
            created_at: UserResult.created_at,
        });
        if (error) return res.status(400).json({message: 'Ocurrió un Error al Registar las Credenciales', error: error});

        return res.status(202).json({
            message: 'Datos Correctos',
            username: username,
            password_length: password.length,
            validation: true,
        });
    }

    static LoginUser = async (req, res) => {
        const {username, password} = req.body;
        if (!username || !password) return res.status(400).json({message: 'Credenciales NO Encontradas'});

        const {data, error} = await supabase
        .from('users')
        .select('email, password, role, key')
        .eq('email', username)
        .eq('password', password)
        .single()
        if (error) return res.status(401).json({message: 'Credenciales NO Validas'});

        if(!data.email || !data.password || !data.role) return res.status(401).json({message: 'Credenciales NO Encontradas'});
        req.session.user = {
            user: data.email,
            role: data.role,
            key: data.key,
        };

        let keyTF;
        if (data.role === 'admin') {
            keyTF = true;
        } else {
            keyTF = false;
        }

        return res.status(200).json({
            QuantumCore: 'Login Exitoso!',
            message: `El Usuario ha Iniciado sesión`,
            user: data.email,
            validation: true,
            role: req.session.user.role,
            key: keyTF,
        });
    }

    static DownloadDocument = async (req, res) => {
        const {user, role, key} = req.session.user || this.nouser;
        if (!user || !role) return res.status(403).json({message: 'Acceso Denegado'});

        const RequestFile = `${req.params.doc}.zip`;
        if (!RequestFile || !fs.existsSync(`docs/${RequestFile}`)) {
            return res.status(404).json({message: 'Archivo NO Encontrado, Intente de Nuevo'});
        }

        const filePath = path.join(__dirname, `../docs/${RequestFile}`);
        return res.download(filePath);
    }

    static GenerateDocuments = (req, res) => {
        const {user, role} = req.session.user || this.nouser;
        if (!user || !role) {
            return res.status(401).json({
                message: 'NO AUTORIZADO',
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
            upload: upload.originalname,
        });
    }

    static GetUploads = async (req, res) => {
        const everyFile = [];
        const folders = await fsPromise.readdir(`uploads`);
            
        for (const folder of folders) {
            const files = await fsPromise.readdir(`uploads/${folder}`);
            everyFile.push({
                folder: folder,
                files: files
            });
        }

        return res.status(202).json({
            message: `Carpeta de Uploads`,
            folderCount: folders.length,
            foldersfiles: everyFile,
        });
    }

    static DeleteFolder = (req, res) => {
        const files = fs.readdirSync('uploads');
        const deleteDir = req.params.dirname;
        const {user, role, key} = req.session?.user || this.nouser;
        if (!user || !role || !key) 
            return res.status(401).json({
            mesagge: 'NO AUTORIZADO',
            ip: req.ip,
            report: `el Usuario ${user} ha Sido Reportado, por Intentar Eliminar Informacion`,
            date: new Date(),
        });

        if (!files.includes(deleteDir)) return res.status(404).json({message: 'Carpeta no Encontrada o ya Eliminada', folder: deleteDir});

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