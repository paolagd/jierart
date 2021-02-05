const artwork = require('../controllers/artwork.controller');
const router = require("express").Router();

router.post("/", artwork.createArtwork); 
router.get("/", artwork.findAll); 
router.get("/:id", artwork.findById); 
router.put("/:id", artwork.updateById);

module.exports = router;