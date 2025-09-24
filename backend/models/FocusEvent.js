const mongoose = require('mongoose');

const FocusEventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: false },
  focused: { type: Boolean, required: true },
  duration: { type: Number, default: 0 },
  meta: { type: Object, default: {} },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FocusEvent', FocusEventSchema);
