import express from "express";

export class QuantumControllersGroup {

    constructor() {}

    static Assign = (req, res) => {
        return res.status(200).json({
            message: 'Assign Name To File',
        });
    }

    static PostToFirstGroup = (req, res) => {
        return res.status(200).json({
            message: 'Post To First Group',
        });
    }
}