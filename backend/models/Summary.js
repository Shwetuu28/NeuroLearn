// backend/models/Summary.js
const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  title: { type: String, trim: true },
  originalText: { type: String, required: true },
  profile: {
    attention: { type: Number, min: 0, max: 100 },
    reading: { type: String, enum: ['visual','text','audio','unknown'], default: 'text' },
    support: { type: String, enum: ['ADHD','Dyslexia','Autism','Default'], default: 'Default' }
  },
  outputs: {
    normal: { type: String },
    simplified: { type: String },
    flashcards: [
      {
        q: { type: String },
        a: { type: String }
      }
    ]
  },
  meta: {
    language: { type: String, default: 'en' },
    createdBy: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Summary', SummarySchema);
