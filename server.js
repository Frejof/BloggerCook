//the beginning 
const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Initialize app and database
const app = express();
app.use(express.json()); // To parse JSON data
app.use(cors()); // Allow CORS

const PORT = process.env.PORT || 5000;

// Set up lowdb to use a file as the database
const adapter = new FileSync('db.json');
const db = low(adapter);

// Default structure for recipes and comments
db.defaults({ recipes: [], comments: [] }).write();

// Route to get a daily recipe
app.get('/api/recipe/:day', (req, res) => {
  const day = req.params.day; // e.g., "day1", "day2"
  const recipe = db.get('recipes').find({ day }).value();
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found!' });
  }
  res.json(recipe);
});

// Route to post a comment
app.post('/api/comments', (req, res) => {
  const { recipeId, userName, commentText } = req.body;
  const newComment = { recipeId, userName, commentText, timestamp: new Date().toISOString() };
  db.get('comments').push(newComment).write();
  res.status(201).json(newComment);
});

// Route to get comments for a recipe
app.get('/api/comments/:recipeId', (req, res) => {
  const { recipeId } = req.params;
  const comments = db.get('comments').filter({ recipeId }).sortBy('timestamp').value();
  res.json(comments);
});

// Server listener
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// the end
