const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'},
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    verified: { type: Boolean, default: false },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
