// backend/lib/ai.js
const fetch = global.fetch || require('node-fetch');

const OPENAI_KEY = process.env.OPENAI_KEY || '';

async function callOpenAI(prompt, system = "You are a helpful assistant.", max_tokens = 300) {
  if (!OPENAI_KEY) throw new Error('OPENAI_KEY not set');
  const url = 'https://api.openai.com/v1/chat/completions';
  const body = {
    model: 'gpt-4o-mini', // change to available model if needed
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: prompt }
    ],
    max_tokens,
    temperature: 0.2
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${txt}`);
  }
  const json = await res.json();
  const message = json.choices?.[0]?.message?.content ?? '';
  return message;
}

// Fallback mock function used when OPENAI_KEY missing or on error
function mockExplain(message) {
  return `${message}\n\nExplanation:\n\nThis is a short, clear explanation of "${message}". (mock)`;
}
function mockTranslate(message, language) {
  return `${message}\n\nTranslation:\n\n[${language} translation of "${message}"]. (mock)`;
}
function mockSummarize(message) {
  return {
    normal: `Normal summary of: ${message}`,
    simplified: `Simplified: ${message.split('.').slice(0,1).join('.')}...`,
    flashcards: [
      { q: 'Q1', a: 'A1' },
      { q: 'Q2', a: 'A2' }
    ]
  };
}

module.exports = {
  callOpenAI,
  mockExplain,
  mockTranslate,
  mockSummarize,
};
