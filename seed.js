const mongoose = require('mongoose');
const Match = mongoose.model('Match', new mongoose.Schema({
  homeTeam: String,
  awayTeam: String,
  startAt: Date,
  status: String
}));

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Match.deleteMany({});
  await Match.insertMany([
    { homeTeam: 'Team A', awayTeam: 'Team B', startAt: new Date(Date.now() + 3600000), status: 'upcoming' },
    { homeTeam: 'Team C', awayTeam: 'Team D', startAt: new Date(Date.now() + 7200000), status: 'upcoming' }
  ]);
  console.log('Seeded');
  process.exit();
});
