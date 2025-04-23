const { Genre, Videogame } = require("../db");

const createNewVideogame = async ({
  name,
  description,
  platforms,
  image,
  released,
  rating,
  genres,
}) => {
  try {
    const createdGame = await Videogame.create({
        name,
        description,
        platforms,
        image,
        released,
        rating,
    });

    const newGameGenre = await Genre.findAll({ where: { name: genres } });

    createdGame.addGenre(newGameGenre);

    return "Videogame created successfully";
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {createNewVideogame}
