const exhibition = require('../controllers/exhibition.controller');
const router = require("express").Router();

router.post("/", exhibition.createExhibition);
router.get("/", exhibition.findAll);
router.get("/:id", exhibition.findById);
router.put("/:id", exhibition.updateById);

module.exports = router;