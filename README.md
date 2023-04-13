# Node.js ChatGPT Demo!

[![](https://badgen.net/badge/Run%20this%20/README/5B3ADF?icon=https://runme.dev/img/logo.svg)](https://runme.dev/api/runme?repository=git%40github.com%3ALizzParody%2Fchatgpt-demo.git)

This project contains different demos using ChatGPT and showcaseS how to build powerful AI Workflows
using [minds](https://github.com/dosco/minds) and OpenAI API

### Ensure you have a .env file with the OpenAI API Key

```bash { background=false interactive=true }
cp .env.example .env
```

### Ensure you have the dependencies install

```bash
npm install
```

## 1. Basic Example

```bash
npm run basic-example
```

## 2. Ask ChatGPT as one of the following characters:

- Leonardo Davinci
- William Shakespeare
- Yoda
- Steve Jobs

Execute the following command to see it in action:

```bash { background=false interactive=true }
npm run start
```

## 3. Analyze a customer support request by automatically identifying:

- Product Name
- Issue description
- Issue summary
- Payment method

```bash { background=true interactive=true }
npm run support-demo
```

## 4. Generate a short and effective marketing messages

- Under 160 characters
- Prompts recipients to book a call
- Employs emojis and friendly language

```bash
npm run marketing.js
```

## 5. Product search based on customer query

- Do you folks have 5 Macbook Pro's M2 with 96GB RAM and 3 iPads in stock?

```bash
npm run product-search.js
```
