require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- MongoDB connection ---
const user = process.env.DB_USER;
const pass = encodeURIComponent(process.env.DB_PASS);
const host = process.env.MONGO_HOST;
const db = process.env.MONGO_DB || 'neurolearn';

if (!user || !pass || !host) {
  console.warn('⚠️ MongoDB env vars missing — DB will not connect.');
} else {
  const uri = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`;

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => {
      console.error('❌ MongoDB connection error:', err.message);
      console.error(err.stack);
    });
}

// ✅ Wire in routes here
const chatRoutes = require('./routes/chat');
const profileRoutes = require('./routes/profile');

app.use('/api/chat', chatRoutes);       // available at http://localhost:4000/api/chat
app.use('/api/profile', profileRoutes); // available at http://localhost:4000/api/profile

// Health check
app.get('/', (req, res) => {
  res.json({ ok: true, msg: 'NeuroLearn backend running 🚀' });
});

// DB test
app.get('/db-test', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({
      ok: true,
      connected: mongoose.connection.readyState === 1,
      collections: collections.map(c => c.name)
    });
  } catch (err) {
    res.status(500).json({ ok: false, err: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
}

module.exports = app;
