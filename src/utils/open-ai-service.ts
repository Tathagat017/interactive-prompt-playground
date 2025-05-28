import { OpenAI } from "openai";
import { PlaygroundConfig } from "../types/OpenAi";

const client = new OpenAI({
  ...(import.meta.env.VITE_OPENAI_ORGANIZATION && {
    organization: import.meta.env.VITE_OPENAI_ORGANIZATION,
  }),
  apiKey: import.meta.env.VITE_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export async function fetchOpenAI({
  model,
  systemPrompt,
  userPrompt,
  temperature,
  max_tokens,
  presence_penalty,
  frequency_penalty,
  stop,
  product,
}: PlaygroundConfig): Promise<string> {
  try {
    const userPromptToSend = userPrompt + `\n\nProduct: ${product}`;
    const chat = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPromptToSend },
      ],
      temperature,
      max_tokens,
      presence_penalty,
      frequency_penalty,
      stop: stop.length ? stop : undefined,
    });

    return chat.choices[0].message.content?.trim() || "";
  } catch (err) {
    console.error("OpenAI SDK Error:", err);
    return "API Error";
  }
}
