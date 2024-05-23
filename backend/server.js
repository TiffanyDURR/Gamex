const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PostModel = require("./models/post.model"); // Ajoutez cette ligne pour importer le modèle
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3006;

// Connexion à la DB
connectDB();

const app = express();

// Middleware qui permet de traiter les données de la Request
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importez vos routes
app.use("/post", cors(), require("./routes/post.routes"));

// Lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port " + port));

// Route pour récupérer tous les scores
app.get("/allScores", async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 }); // Utilisez PostModel ici
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
