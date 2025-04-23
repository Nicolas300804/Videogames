const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Videogames= require("./videogames")
const Genres = require("./genres")
const Platforms = require("./platforms")


const router = Router();
router.use("/videogames", Videogames)
router.use("/genres", Genres)
router.use("/platforms", Platforms)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
