// backend/routes/chat.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const { callOpenAI, mockExplain, mockTranslate, mockSummarize } = require('../lib/ai');

const router = express.Router();

/**
 * POST /api/chat
 * Body: { message: string, action: 'explain'|'translate'|'summarize', language?: string }
 * Responses:
 * - minimal: { reply: "..." }
 * - structured (summarize): { normal, simplified, flashcards }
 */
router.post('/',
  body('message').isString().notEmpty(),
  body('action').isIn(['explain','translate','summarize']).default('explain'),
  body('language').optional().isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { message, action, language = 'English' } = req.body;

    // If OPENAI_KEY present, try calling OpenAI with a safe prompt. Otherwise use mock.
    const hasKey = !!process.env.OPENAI_KEY;

    try {
      if (action === 'explain') {
        if (hasKey) {
          const prompt = `Explain the following in a very simple way suitable for K-12 students. Keep it concise.\n\nText: ${message}\n\nProvide the explanation only.`;
          const reply = await callOpenAI(prompt, "You are a friendly, concise teacher.");
          return res.json({ reply });
        } else {
          return res.json({ reply: mockExplain(message) });
        }
      }

      if (action === 'translate') {
        if (hasKey) {
          const prompt = `Translate the following text to ${language}. Keep meaning intact and produce only the translation.\n\nText: ${message}`;
          const reply = await callOpenAI(prompt, "You are a precise translator.");
          return res.json({ reply });
        } else {
          return res.json({ reply: mockTranslate(message, language) });
        }
      }

      if (action === 'summarize') {
        if (hasKey) {
          // Ask for JSON so we can parse structured output
          const prompt = `Read the text below and produce a JSON object with keys: "normal", "simplified", "flashcards".
- "normal": 1-2 paragraph summary.
- "simplified": a short, simple summary for learners with reading difficulties.
- "flashcards": an array of objects [{"q":"question","a":"answer"}, ...] (3 items).
Return ONLY valid JSON in the response.\n\nText: ${message}`;
          const reply = await callOpenAI(prompt, "You are an educational assistant that outputs strict JSON.");
          // attempt to parse JSON from reply
          try {
            const obj = JSON.parse(reply);
            return res.json(obj);
          } catch (err) {
            // fallback: return string reply under normal
            return res.json({ normal: reply, simplified: '', flashcards: [] });
          }
        } else {
          return res.json(mockSummarize(message));
        }
      }

      return res.status(400).json({ error: 'Unknown action' });
    } catch (err) {
      console.error('Chat error', err);
      // fallback to mock
      if (action === 'summarize') return res.json(mockSummarize(message));
      if (action === 'translate') return res.json({ reply: mockTranslate(message, language) });
      return res.json({ reply: mockExplain(message) });
    }
  }
);

module.exports = router;
