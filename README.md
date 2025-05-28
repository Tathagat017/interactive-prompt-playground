# 🧪 Interactive Prompt Playground

![image](https://github.com/user-attachments/assets/cd23408c-623f-44d7-94b2-4d6ec6222bad)

An interactive playground for experimenting with OpenAI API parameters and prompt engineering. Test different combinations of parameters to see how they affect the model's output.

## Features

### Parameter Controls

- **Temperature**: Control randomness (0.0 - 1.2)

  - Precise (0.0): More deterministic outputs
  - Balanced (0.7): Good for most use cases
  - Creative (1.2): More diverse outputs

- **Max Tokens**: Control response length

  - Short (50): Brief responses
  - Medium (150): Standard length
  - Long (300): Detailed responses

- **Presence Penalty**: Control topic repetition (-2.0 to 2.0)

  - None (0.0): No penalty
  - Moderate (0.75): Some topic diversity
  - High (1.5): Strong topic diversity

- **Frequency Penalty**: Control word repetition (-2.0 to 2.0)
  - None (0.0): No penalty
  - Moderate (0.75): Some word diversity
  - High (1.5): Strong word diversity

### Model Selection

- GPT-3.5 Turbo: Faster, more cost-effective
- GPT-4: More capable, higher quality outputs

### Prompt Engineering

- System Prompt: Define the AI's behavior and role
- User Prompt: Your specific request or question
- Product Selection: Pre-configured for product descriptions
- Stop Sequences: Custom sequences to end generation

### Output Analysis

- Compare multiple parameter combinations
- View all parameters used for each output
- Scrollable results table with sticky headers
- Hover effects for better readability

## Getting Started

1. Clone the repository:

```bash
git clone [repository-url]
cd interactive-prompt-playground
```

2. Install dependencies:

```bash
npm install
```

3. Set up your OpenAI API key:
   Create a `.env` file in the root directory and add:

```
VITE_OPENAI_API_KEY=your-api-key-here
```

```
VITE_OPENAI_ORGANISATION=your organisation id
```

````


4. Start the development server:

```bash
npm run dev
````

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Select your desired model (GPT-3.5 Turbo or GPT-4)
2. Configure your system and user prompts
3. Adjust parameters using the sliders
4. Add any stop sequences if needed
5. Click "Run with current combination" to test a single set of parameters
6. Click "Run All Combinations" to test multiple parameter combinations
7. Use the "Reset" button to restore default settings

## Technologies Used

- React
- TypeScript
- MobX for state management
- Mantine UI components
- OpenAI API

## Reflection

Changing OpenAI’s parameters like temperature, max tokens, presence penalty, and frequency penalty has a big impact on the output. Temperature controls creativity—lower values (like 0.2) give more focused and reliable answers, while higher values (like 0.8 or 1.0) make the model more creative and unpredictable. Max tokens limits how long the response can be. A small value might cut off responses too early, while a larger one allows for more complete and detailed answers.

Presence penalty and frequency penalty help reduce repetition. Presence penalty stops the model from repeating the same topics or words it’s already used, encouraging fresh ideas. Frequency penalty reduces how often the same words are repeated, making the output less redundant. Together, adjusting these lets you control how creative, concise, or varied the model’s answers are, depending on what kind of result you’re looking for.

## All outputs - 36 combinations

[prompt-results.xlsx](https://github.com/user-attachments/files/20482873/prompt-results.xlsx)
