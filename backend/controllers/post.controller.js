const PostModel = require("../models/post.model");

module.exports.getPosts = async (req, res) => {
  const posts = await PostModel.find();
  res.status(200).json(posts);
};
module.exports.setPosts = async (req, res) => {
  if (!req.body.playerName) {
    res.status(400).json({ playerName: "Merci d'ajouter votre nom" });
  }

  const post = await PostModel.create({
    playerName: req.body.playerName,
    correctAnswers: req.body.correctAnswers,
    gameTime: req.body.gameTime,
    totalScore: req.body.totalScore,
  });
  res.status(200).json(post);
};

// Fonction pour récupérer tous les scores
module.exports.getAllScores = async (req, res) => {
  try {
    const scores = await PostModel.find().sort({ createdAt: -1 });
    res.status(200).json(scores);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Fonction pour créer un nouveau score
module.exports.createScore = async (req, res) => {
  try {
    const { playerName, correctAnswers, gameTime, totalScore } = req.body;
    const newScore = await PostModel.create({
      playerName,
      correctAnswers,
      gameTime,
      totalScore,
    });
    res.status(201).json(newScore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
