import { env } from "node:process";

import { OpenAI, OpenAICreativeOptions, GenerateText, MessagePrompt, MessageType } from '@dosco/minds';
  
  const ai = new OpenAI(env.OPENAI_API_KEY, OpenAICreativeOptions());
  
  const product = {
    name: 'Acme House Cleaning',
    description: 'clean your house, studio, and more',
  };
  
  const to = {
    name: 'Shakira',
    title: 'Singer',
    company: 'Independent',
  };
  
  const prompt = new MessagePrompt({ type: MessageType.Text }, product, to);
  const gen = new GenerateText(ai);
  
  const context = `
  1. Under 160 characters
  2. Prompts recipients to book a call
  3. Employs emojis and friendly language
  `;
  
  const res = await gen.generate(context, prompt);
  console.log(res.value());
  