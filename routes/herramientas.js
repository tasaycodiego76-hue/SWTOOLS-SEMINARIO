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
//BUSCADOR
//HTTP://IP:3000/herramientas/1
router.get("/:id", async (req, res) => {
    try {
        const query = 'SELECT * FROM herramientas WHERE idherramienta = ?';
        //Deserealización , el primero alor
        //El método query devuelve una MATRIZ
        //db.query = [[registros...], [info_query...]]
        const [rows] = await db.query(query, [req.params.id]);

        //Es necesario validar si existen datos 
        if(rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "Herramienta no encontrada"
            });
        }
        res.status(200).json({
            success: true,
            data: rows[0]
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
        const query = 'INSERT INTO herramientas (nombre,marca, descripcion, condicion, tipo) VALUES (?, ?, ?, ?, ?)';
        const {nombre, marca, descripcion, condicion, tipo} = req.body;


    if (!nombre|| nombre == ""){
return res.status(400).json({success: false,message: "Se requiere el nombre"});
    }
    if (!marca|| marca == ""){
return res.status(400).json({success: false,message: "Se requiere la marca"});
    }
    if (!descripcion|| descripcion == ""){
return res.status(400).json({success: false,message: "Se requiere la descripción"});
    }
    if (!condicion|| condicion == ""){
return res.status(400).json({success: false,message: "Se requiere la condición"});
    }
    if (!tipo|| tipo == ""){
return res.status(400).json({success: false,message: "Se requiere el tipo de herramienta"});
    }


    //Datos requeridos para los comodines
    const values =[
        nombre, 
        marca,
        descripcion,
        condicion,
        tipo
    ]

    //Ejecutar la consulta
    const [result] = await db.query(query, values);
    

    res.status(201).json({
        success: true,
        message: "Herramienta registrada correctamente", 
        id: result.insertId
    });
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
router.put("/:id", async (req, res) => {
    try {

        const query = ` 
        UPDATE herramientas SET
        nombre =?,
        marca = ?,
        descripcion =?,
        condicion =?,
        tipo =?
        WHERE idherramienta =?`;
        //Existe el ID que solicitan actualizar?
        const [resultHerramientas] = await db.query('SELECT * FROM herramientas WHERE idherramienta = ?', [req.params.id]);

        if(resultHerramientas.length === 0){
            return res.status(404).json({
                success: false,
                message: "No encontramos la herramienta con el ID indicado"
            });
        }

        const {nombre, marca, descripcion, condicion, tipo, idherramienta} = req.body;
    if (!nombre|| nombre == ""){
return res.status(400).json({success: false,message: "Se requiere el nombre"});
    }
    if (!marca|| marca == ""){
return res.status(400).json({success: false,message: "Se requiere la marca"});
    }
    if (!descripcion|| descripcion == ""){
return res.status(400).json({success: false,message: "Se requiere la descripción"});
    }
    if (!condicion|| condicion == ""){
return res.status(400).json({success: false,message: "Se requiere la condición"});
    }
    if (!tipo|| tipo == ""){
return res.status(400).json({success: false,message: "Se requiere el tipo de herramienta"});
    }

    //Actualizamos el registro => EXISTE + TRAE DATOS
    const 
        values = [
            nombre,
            marca,
            descripcion,
            condicion,
            tipo,
            req.params.id
        ];
        const [result] = await db.query(query, values);
        res.json({
            success: true,
            message: "Herramienta actualizada correctamente"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en la comunicación al servidor",
            error: error.message
        });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const query = "DELETE FROM herramientas WHERE idherramienta = ?";
        const [result]= await db.query(query, [req.params.id])

        //La consulta se ejecutó sin problemas, pero NO afectó la tabla
        if(result.affectedRows === 0){
            return res.status(404).json({
                success: false,
                message:"No existe la herramienta que desea eliminar"
            });
        }
        res.json({
            success: true,
            message: "Eliminado correctamente"
        });

     }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en la comunicación al servidor",
            error: error.message
        });
    }
});
module.exports = router;