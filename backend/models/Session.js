const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  sessionName: { type: String, trim: true },
  focusedMinutes: { type: Number, default: 0 },
  totalMinutes: { type: Number, default: 0 },
  events: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', SessionSchema);
