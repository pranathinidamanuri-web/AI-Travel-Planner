const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateTripAI = async ({ destination, days, budget, interests }) => {
  const prompt = `
Plan a ${days}-day trip to ${destination}.
Budget: ${budget}
Interests: ${interests.join(", ")}

Give:
1. Day-wise itinerary
2. Budget breakdown (flights, hotel, food, activities)
3. 3 hotel suggestions
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
};

module.exports = { generateTripAI };