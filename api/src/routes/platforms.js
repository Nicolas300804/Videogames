const {Router} = require("express")
const {getPlatforms} = require ("../controllers/getPlatforms")
const router = Router();

router.get('/', (req, res) => {
    const response = getPlatforms()
    res.status(200).json(response)
  })

module.exports=router