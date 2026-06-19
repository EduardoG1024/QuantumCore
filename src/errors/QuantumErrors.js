import express from "express"

export class QuantumErrors {

    constructor() {}

    static BadRequest = () => {
        console.log('Ocurrio un error');
    }

    static Unauthorized = () => {

    }

    static Forbidden = () => {

    }

    static NotFound = () => {

    }
}