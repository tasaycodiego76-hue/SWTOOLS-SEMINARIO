//Este archivo contendrá toda la lógica para operar con los datos -> DB
const express = require("express");
const router = express.Router();
const db = require("../config/db");

//Utilizando express (framwork JS) vamos a utilizar métodos de acceso
//localhost:3000/herramientas
//req = require = solicitud
//res = response = respuesta (JSON)

router.get("/", async (req, res) => {
  try {
    //const query = "CALL spu_herramientas_listar()";
    const query = "SELECT * FROM herramientas";

    //Deserializacion, el primer valor
    //El metodo query devuelve una MATRIZ
    //db.query = [[registros....], [info_query]]
    const [rows] = await db.query(query);

    //Devolvemos los datos obtenidos como JSON
    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    //¿Por que 500? Error generado del lado del servidor
    res.status(500).json({
      success: false,
      message: "Error con la Comunicacíón al servidor",
      error: err.message,
    });
  }
});

//Buscador
//http://IP:3000/api/herramientas/1
router.get("/:id", async (req, res) => {
  try {
    const query = "SELECT * FROM herramientas WHERE idherramienta = ?";

    //Deserializacion, el primer valor
    //El metodo query devuelve una MATRIZ
    //db.query = [[registros....], [info_query]]
    const [rows] = await db.query(query, [req.params.id]);

    //Es necesario validar si existen datos
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontro la Herramienta con ese ID",
      });
    }

    //Devolvemos los datos obtenidos como JSON
    res.json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    //¿Por que 500? Error generado del lado del servidor
    res.status(500).json({
      success: false,
      message: "Error con la Comunicacíón al servidor",
      error: err.message,
    });
  }
});

//Registrar
router.post("/", async (req, res) => {
  try {
    const query =
      "INSERT INTO herramientas (nombre, marca, descripcion, condicion, tipo) VALUES (?,?,?,?,?)";

    //Obtener los datos  ....deserializar
    const { nombre, marca, descripcion, condicion, tipo } = req.body;

    //El WS tiene que tener la capacidad de validar
    if (!nombre || nombre == "") {
      return res
        .status(400)
        .json({ success: false, message: "Se requiere el nombre" });
    }

    if (!marca || marca == "") {
      return res
        .status(400)
        .json({ success: false, message: "Se requiere la marca" });
    }

    if (!descripcion || descripcion == "") {
      return res
        .status(400)
        .json({ success: false, message: "Se requiere la descripción" });
    }

    if (!condicion || condicion == "") {
      return res
        .status(400)
        .json({ success: false, message: "Se requiere la marca" });
    }

    if (!tipo || tipo == "") {
      return res
        .status(400)
        .json({ success: false, message: "Se requiere la descripción" });
    }

    const values = [nombre, marca, descripcion, condicion, tipo];

    //Ejecutar la consulta
    const [result] = await db.query(query, values);

    //Informar la ejecucion de la operacion
    res.status(201).json({
      success: true,
      message: "Herramienta Registrada Correctamente",
      id: result.insertId,
    });
  } catch (err) {
    //¿Por que 500? Error generado del lado del servidor
    res.status(500).json({
      success: false,
      message: "Error con la Comunicacíón al servidor",
      error: err.message,
    });
  }
});

//Editar
router.put("/:id", async (req, res) => {
  try {
    const query = `
    UPDATE herramientas SET
        nombre = ?,
        marca = ?,
        descripcion = ?,
        condicion = ?,
        tipo = ?
    WHERE idherramienta = ?
    `;

    //¿Existe el ID que solicitan actualizar?
    const [resultHerramientas] = await db.query(
      "SELECT * FROM herramientas WHERE idherramienta = ?",
      [req.params.id],
    );

    if (resultHerramientas.length == 0) {
      return res.status(404).json({
        success: false,
        message: `No Encontramos la Herramienta con el ID: ${req.params.id}`,
      });
    }

    //Obtener los datos  ....deserializar
    const { nombre, marca, descripcion, condicion, tipo } = req.body;

    //El WS tiene que tener la capacidad de validar
    if (!nombre || nombre == "") {
      return res
        .status(400)
        .json({ success: false, message: "Se requiere el nombre" });
    }

    if (!marca || marca == "") {
      return res
        .status(400)
        .json({ success: false, message: "Se requiere la marca" });
    }

    if (!descripcion || descripcion == "") {
      return res
        .status(400)
        .json({ success: false, message: "Se requiere la descripción" });
    }

    if (!condicion || condicion == "") {
      return res
        .status(400)
        .json({ success: false, message: "Se requiere la marca" });
    }

    if (!tipo || tipo == "") {
      return res
        .status(400)
        .json({ success: false, message: "Se requiere la descripción" });
    }

    const values = [nombre, marca, descripcion, condicion, tipo, req.params.id];

    //Ejecutar la consulta
    const [result] = await db.query(query, values);

    //Informar la ejecucion de la operacion
    res.json({
      success: true,
      message: "Actualizado Correctamente",
    });
  } catch (err) {
    //¿Por que 500? Error generado del lado del servidor
    res.status(500).json({
      success: false,
      message: "Error con la Comunicacíón al servidor",
      error: err.message,
    });
  }
});

//Eliminar | Peligro OJO
router.delete("/:id", async (req, res) => {
  try {
    const query = "DELETE FROM herramientas WHERE idherramienta = ?";
    //const query = "CALL spu_herramientas_eliminar(?)";
    const [result] = await db.query(query, [req.params.id]);

    //La consulta se ejecuto sin problemas, pero no afecto a la tabla¿
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "No existe la herramienta que desea eliminar",
      });
    }

    res.json({
      success: true,
      message: "Eliminado Correctamente",
    });
  } catch (err) {
    //¿Por que 500? Error generado del lado del servidor
    res.status(500).json({
      success: false,
      message: "Error con la Comunicacíón al servidor",
      error: err.message,
    });
  }
});

module.exports = router;
