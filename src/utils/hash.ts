import { QueryHashedKey } from "../types/OpenAi";

export function getPromptKey(params: QueryHashedKey): string {
  return JSON.stringify(params);
}
