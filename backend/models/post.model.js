const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    playerName: {
      type: String,
      required: true,
    },
    correctAnswers: {
      type: String,
      required: true,
    },
    gameTime: {
      type: String,
      required: true,
    },
    totalScore: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);
