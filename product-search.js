import { env } from "node:process";

import { OpenAI, Memory, GenerateText, QuestionAnswerPrompt,} from '@dosco/minds';

import chalk from 'chalk';

const ai = new OpenAI(env.OPENAI_API_KEY);

const productDB = [
  { name: 'Macbook Pro', description: 'M2, 32GB', in_stock: 4321 },
  { name: 'iPhone 14 Pro', description: '128GB', in_stock: 2 },
];

const productSearch = (text, embeddings) => {
  return JSON.stringify(productDB.filter((v) => text.includes(v.name)));
};

// List of actions available to the AI
const actions = [
  {
    name: 'Product Search',
    description: 'Used to search up a products information by its name',
    action: productSearch,
  },
];

const context = 'This question related to customer support';

const mem = new Memory();
const prompt = new QuestionAnswerPrompt(actions, context);
const gen = new GenerateText(ai, mem);
gen.setDebug(true);

const customerQuery = `Do you folks have 5 Macbook Pro's M2 with 32GB RAM and 3 iPads in stock?`;

const res = await gen.generate(customerQuery, prompt);
console.log(chalk.green('Answer for customer:', res.value()));
