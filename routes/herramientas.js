const express = require ("express");
const router = express.Router();
const db = require("../config/db");

//Utilizando express(framework JS) vamos a utilziar metodos de acceso
//localhost:3000/herramientas
//req = require = solicitud
//res = response = response (JSON)
router.get("/", async (req, res) => {
    try {
        const query = 'SELECT * FROM herramientas';
        //Deserealización , el primero alor
        //El método query devuelve una MATRIZ
        //db.query = [[registros...], [info_query...]]
        const [rows] = await db.query(query);
        res.json({
            success: true,
            data: rows
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en la comunicación al servidor",
            error: error.message
        });
    }
});
//Registrar
router.post("/", async (req, res) => {
    try {

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en la comunicación al servidor",
            error: error.message
        });
    }
});

//Actualizar
router.put("/", async (req, res) => {
    try {

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en la comunicación al servidor",
            error: error.message
        });
    }
});
router.delete("/", async (req, res) => {
    try {

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en la comunicación al servidor",
            error: error.message
        });
    }
});