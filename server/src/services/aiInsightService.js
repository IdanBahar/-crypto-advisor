export async function getAiInsightFromLLM() {
  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            {
              role: 'system',
              content:
                "You are a crypto advisor. Give a short insight about today's crypto market. Max 40 words.",
            },
            {
              role: 'user',
              content: "Give me today's crypto insight",
            },
          ],
          max_tokens: 60,
        }),
      }
    )

    const data = await response.json()

    const raw = data?.choices?.[0]?.message?.content || ''

    let text = raw
      .replace(/^\s*<s>\s*/i, '')
      .replace(/^\s*<\/s>\s*/i, '')
      .replace(/^\[out\]\s*/i, '')
      .replace(/^\[OUT\]\s*/i, '')
      .replace(/^\[ֿֿֿֿֿ\OUT]\s*/i, '')
      .replace(/^\[response\]\s*/i, '')
      .replace(/<\/?output>/gi, '')
      .replace(/<\/?assistant>/gi, '')
      .replace(/<\/?system>/gi, '')
      .replace(/\[\/OUT\]\s*$/i, '')
      .replace(/\[\/out\]\s*$/i, '')
      .replace(/\[\/response\]\s*$/i, '')
      .trim()
    return {
      insight: text,
      generatedAt: new Date().toISOString(),
    }
  } catch (error) {
    console.error('LLM Error:', error)

    return {
      insight: 'Unable to fetch AI insight right now.',
      generatedAt: new Date().toISOString(),
    }
  }
}
export default {
  getAiInsightFromLLM,
}
