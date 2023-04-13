import { env } from "node:process";

import { OpenAI, Memory, GenerateText, ExtractInfoPrompt,  BusinessInfo } from '@dosco/minds';

  const ai = new OpenAI(env.OPENAI_API_KEY);
  
  const entities = [
    { name: BusinessInfo.ProductName },
    { name: BusinessInfo.IssueDescription },
    { name: BusinessInfo.IssueSummary },
    { name: BusinessInfo.PaymentMethod, classes: ['Cash', 'Credit Card'] },
  ];
  
  const mem = new Memory();
  const prompt = new ExtractInfoPrompt(entities);
  const gen = new GenerateText(ai, mem);
  
  const customerMessage = `
  Hello support team,

  I’m having problems with the Smartwatch 111 that I bought. I received the package a week ago, I paid in cash and now it doesn’t turn on. I checked the battery, tried to reset it, and press all the buttons, but it still doesn’t work (it remains all blank) I think it is a defect in the product and I want a refund or replacement. 
  
  Let me know what are the next steps, thank you.
  
  Lizz
    `;
  
  const res = await gen.generate(customerMessage, prompt);
  
  console.log(
    `Customer Message:\n${customerMessage}\n\nExtracted Details From Customer Message:\n`,
    res.value()
  );
  