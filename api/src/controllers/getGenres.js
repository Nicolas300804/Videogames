require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Genre } = require("../db");

const getgenres = async()=>{
    try {
        const getgenresDB = await Genre.findAll()  //encuentra los generos en la DB
        if (getgenresDB.length===0) {  //si no hay nada haz la peticion y mapea el arreglo de generos
            const petition = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            const apiGenres=petition.data.results.map(gen=> gen.name)

            for (const genre of apiGenres) {     //Se itera sobre cada género en apiGenres.
                await Genre.findOrCreate({       //Se utiliza Genre.findOrCreate() para buscar un género con el mismo nombre en la base de datos.
                    where:{name:genre}
                })
            }
            return apiGenres
        } else{
            return getgenresDB
        } 

    } catch (error) {
        throw new Error('Genero no encontrado')
    }
}

module.exports={getgenres}