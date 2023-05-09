require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Genre, Videogame } = require("../db");

const getApiVideogames = async () => {
    try {
        let dataGames = []
    
        for (let i = 1; i < 6; i++) {
          const apiData = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
    
          dataGames.push(apiData)
        }
    
        dataGames = (await Promise.all(dataGames)).map(res => res.data.results.map(game => {
          return ({
            id: game.id,
            name: game.name,
            released: game.released,
            image: game.background_image,
            rating: game.rating,
            platforms: game.platforms.map(el => el.platform.name),
            genres: game.genres.map(el => el.name)
          })
        }))
    
        let allVideogames = []
        dataGames.forEach(game => { allVideogames = allVideogames.concat(game) })
    
        return allVideogames
      } catch (error) {
        throw new Error('Couldnt get the videogames from the API')
      }
  
};

const getDBVideogames = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
const getallVideogames = async () => {
  const infoApi = await getApiVideogames();
  const DbInfo = await getDBVideogames();
  const Total = infoApi.concat(DbInfo);
  return Total;
};

module.exports = { getallVideogames };
