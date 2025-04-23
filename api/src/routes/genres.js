const {Router} = require("express")
const {getgenres} = require ("../controllers/getGenres")
const router = Router();

router.get("/", async(req,res)=>{
    try {
        const response=await getgenres()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

module.exports=router