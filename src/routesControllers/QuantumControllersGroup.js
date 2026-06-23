import express from "express";
import path from "path";

export class QuantumControllersGroup {

    constructor() {}

    static PostToFirstGroup = (req, res) => {
        const name = req.body.name;

        return res.status(200).json({
            message: 'Post To First Group',
            file: `${name}`,
            path: `groupOne/${name}`,
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