const { Router } = require("express");
const { getallVideogames, getVideogamesId } = require("../controllers/getVideogames");
//const { createNewVideogame } = require("../controllers/postVideogame");
const { Videogame,Genre} = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      let games = await getallVideogames().then((data) =>
        data.filter((game) =>
          game.name.toLowerCase().includes(name.toLowerCase())
        )
      );
      if (games.length === 0) {
        res.status(400).send("Videogame not found");
      } else {
        res.status(200).send(games);
      }
    } else {
      const allVideogames = await getallVideogames();
      return res.status(200).json(allVideogames);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/:id",async (req, res)=>{
  const {id}=req.params
  try {
    const responseGameId = await getVideogamesId(id)
    res.status(200).json(responseGameId)
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})

router.post("/", async (req, res) => {
  try {
    let { name, description, platforms, image, released, rating, genres, createdInDb } =
      req.body;
    let game = await Videogame.create({
      name,
      description,
      platforms,
      image,
      released,
      rating,
      genres,
      createdInDb
    });
    let genresDb = await Genre.findAll({
      where: {
        name: genres,
      },
    });
    await game.addGenre(genresDb);
    res.status(200).send("Videogame created successfully");
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

module.exports = router;
