const router = require("express").Router();
const NewsLetter = require("../models/NewsLetter");


router.get("/", async (req, res) => {
  try {
    var n = await NewsLetter.find();
    res.status(200).json(n);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
    const newsLetter = new NewsLetter({
        email: req.body.email,
    });

  try {
    const savedNewsLetter = await newsLetter.save();
    res.status(200).json(savedNewsLetter);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;