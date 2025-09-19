const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Mongo connect
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bettingapp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Models
const Match = mongoose.model('Match', new mongoose.Schema({
  homeTeam: String,
  awayTeam: String,
  startAt: Date,
  score: { home: Number, away: Number },
  status: { type: String, enum: ['upcoming', 'finished'], default: 'upcoming' }
}));

// Routes
app.get('/api/matches', async (req, res) => {
  const matches = await Match.find();
  res.json(matches);
});

app.post('/api/matches', async (req, res) => {
  const match = new Match(req.body);
  await match.save();
  res.json(match);
});

app.listen(3000, () => console.log('Backend running on port 3000'));
