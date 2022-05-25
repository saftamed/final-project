const router = require("express").Router();
const Comment = require('../models/Comment');
const Product = require("../models/Product");
const { checkLogin } = require("./userMidelWare");

router.post("/", checkLogin, async (req, res) => {
  const comment = new Comment({...req.body, userId: req.user.id});
  try {
    const savedComment = await comment.save();
    const p = await Product.findById(req.body.productId);
    p.rating = (p.rating * p.numbreOfRatings + req.body.rating) / (p.numbreOfRatings + 1);
    p.numbreOfRatings++;
    p.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/", async (req, res) => {
    try {
      const comments = await Comment.find().populate('userId','email').populate('productId','title').limit(10);

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/verify/:id", async (req, res) => {
    try {
      const comment = await Comment.findByIdAndUpdate(req.params.id, {verified: true});

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/:id", async (req, res) => {
    try {
      const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        });

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });




module.exports = router;