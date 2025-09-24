// backend/routes/profile.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const Summary = require('../models/Summary');

const router = express.Router();

/**
 * POST /api/profile/summaries
 * Body: { userId, title, originalText, profile, outputs }
 */
router.post('/summaries',
  body('originalText').isString().notEmpty(),
  body('outputs').isObject().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { userId = null, title = '', originalText, profile = {}, outputs } = req.body;

    try {
      const doc = await Summary.create({
        userId,
        title,
        originalText,
        profile,
        outputs,
      });
      return res.json({ ok: true, summaryId: doc._id, doc });
    } catch (err) {
      console.error('Save summary error', err);
      return res.status(500).json({ ok: false, msg: 'Failed to save summary' });
    }
  }
);

/**
 * GET /api/profile/summaries?userId=...
 */
router.get('/summaries', async (req, res) => {
  const { userId } = req.query;
  try {
    const items = await Summary.find(userId ? { userId } : {}).sort({ createdAt: -1 }).limit(200);
    return res.json({ items });
  } catch (err) {
    console.error('List summaries error', err);
    return res.status(500).json({ ok: false, msg: 'Failed to list summaries' });
  }
});

module.exports = router;
