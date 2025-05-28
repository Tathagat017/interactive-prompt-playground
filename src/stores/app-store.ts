import { makeAutoObservable } from "mobx";
import { fetchOpenAI } from "../utils/open-ai-service";
import { queryClient } from "../utils/query-client";
import { getPromptKey } from "../utils/hash";
import { ModelType, OpenAIParams } from "../types/OpenAi";

export class AppStore {
  product = "iPhone 15 Pro";
  systemPrompt =
    "You are a helpful assistant that generates detailed product descriptions for e-commerce websites";
  userPrompt = `Write a compelling product description for ${this.product} highlighting its key features and benefits`;
  temperature = [0.0, 0.7, 1.2];
  maxTokens = [50, 150, 300];
  presencePenalty = [0.0, 1.5];
  frequencyPenalty = [0.0, 1.5];
  stopSequences: string[] = [];
  model: ModelType = "gpt-3.5-turbo";

  outputs: Array<{
    params: OpenAIParams;
    output: string;
  }> = [];

  loading = false;
  currentLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  setPrompts(system: string, user: string) {
    this.systemPrompt = system;
    this.userPrompt = user;
  }

  setModel(model: "gpt-3.5-turbo" | "gpt-4") {
    this.model = model;
  }

  setTemperature(temp: number) {
    this.temperature = [temp];
  }

  setMaxTokens(max_tokens: number) {
    this.maxTokens = [max_tokens];
  }

  setPresencePenalty(presence_penalty: number) {
    this.presencePenalty = [presence_penalty];
  }

  setFrequencyPenalty(frequency_penalty: number) {
    this.frequencyPenalty = [frequency_penalty];
  }

  setProduct(product: string) {
    this.product = product;
    this.userPrompt = `Write a compelling product description for ${this.product} highlighting its key features and benefits`;
  }

  setStopSequences(seqs: string[]) {
    this.stopSequences = seqs;
  }

  setUserPrompt(userPrompt: string) {
    this.userPrompt = userPrompt;
  }

  setSystemPrompt(systemPrompt: string) {
    this.systemPrompt = systemPrompt;
  }

  async runAll() {
    this.loading = true;
    this.outputs = [];

    const combinations = this.temperature.flatMap((temp) =>
      this.maxTokens.flatMap((max_tokens) =>
        this.presencePenalty.flatMap((presence_penalty) =>
          this.frequencyPenalty.map((frequency_penalty) => ({
            temperature: temp,
            max_tokens,
            presence_penalty,
            frequency_penalty,
            stop: this.stopSequences,
          }))
        )
      )
    );

    const results = await Promise.all(
      combinations.map(async (params) => {
        const queryKey = getPromptKey({
          ...params,
          systemPrompt: this.systemPrompt,
          userPrompt: this.userPrompt,
          model: this.model,
          product: this.product,
        });

        const result = await queryClient.fetchQuery({
          queryKey: ["openai", queryKey],
          queryFn: () =>
            fetchOpenAI({
              model: this.model,
              systemPrompt: this.systemPrompt,
              userPrompt: this.userPrompt,
              product: this.product,
              ...params,
            }),
          staleTime: Infinity,
        });

        return {
          params,
          output: result,
        };
      })
    );

    this.outputs = results;
    this.loading = false;
  }

  async runCurrent() {
    this.currentLoading = true;
    this.outputs = [];
    const params = {
      temperature: this.temperature[0],
      max_tokens: this.maxTokens[0],
      presence_penalty: this.presencePenalty[0],
      frequency_penalty: this.frequencyPenalty[0],
      stop: this.stopSequences,
    };
    const queryKey = getPromptKey({
      ...params,
      systemPrompt: this.systemPrompt,
      userPrompt: this.userPrompt,
      model: this.model,
      stop: this.stopSequences,
      product: this.product,
    });
    const result = await queryClient.fetchQuery({
      queryKey: ["openai", queryKey],
      queryFn: () =>
        fetchOpenAI({
          model: this.model,
          systemPrompt: this.systemPrompt,
          userPrompt: this.userPrompt,
          product: this.product,
          ...params,
        }),
      staleTime: Infinity,
    });
    this.outputs = [{ params, output: result }];
    this.currentLoading = false;
  }

  async reset() {
    this.loading = false;
    this.currentLoading = false;
    this.outputs = [];
    this.product = "iPhone 15 Pro";
    this.systemPrompt =
      "You are a helpful assistant that generates detailed product descriptions for e-commerce websites";
    this.userPrompt = `Write a compelling product description for ${this.product} highlighting its key features and benefits`;
    this.temperature = [0.0, 0.7, 1.2];
    this.maxTokens = [50, 150, 300];
    this.presencePenalty = [0.0, 1.5];
    this.frequencyPenalty = [0.0, 1.5];
    this.stopSequences = [];
    this.model = "gpt-3.5-turbo";
  }
}

export const appStore = new AppStore();
