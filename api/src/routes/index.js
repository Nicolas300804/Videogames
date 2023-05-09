const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Videogames= require("./videogames")


const router = Router();
router.use("/videogames", Videogames)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
