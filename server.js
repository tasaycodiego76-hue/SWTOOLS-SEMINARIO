//Es necesario desplegar/ejecutar la aplicación
const express = require ("express")
const cors = require("cors")
require("dotenv").config(); //PORT (valor requerido)

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors()); //Permitir solicitudes desde cualquier origen (CORS)
app.use(express.json()); //Para que el servidor pueda interpretar los datos en formato JSON

//Rutas
app.use('/api/herramientas', require('./routes/herramientas'));

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

module.exports = app;