const artist = require('../controllers/artist.controller');
const router = require("express").Router();

router.post("/", artist.createArtist);
router.get("/", artist.findAll);
router.get("/:id", artist.findById);
router.put("/:id", artist.updateById);

module.exports = router;