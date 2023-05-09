const {Router} = require("express")
const {getallVideogames} = require ("../controllers/getVideogames")
const router = Router();

router.get("/", async(req,res)=>{
    const { name } = req.query
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
    }else {
      const allVideogames = await getallVideogames()
      return res.status(200).json(allVideogames)
    }
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports=router