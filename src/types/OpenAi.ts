export type OpenAIParams = {
  temperature: number;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;
  stop?: string[];
};
export interface PlaygroundConfig {
  systemPrompt: string;
  userPrompt: string;
  temperature: number;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;
  stop: string[];
  model: ModelType;
  product: string;
}

export type ModelType = "gpt-3.5-turbo" | "gpt-4";

export interface QueryHashedKey extends OpenAIParams {
  systemPrompt?: string;
  userPrompt?: string;
  model?: ModelType;
  stop?: string[];
  product?: string;
}
