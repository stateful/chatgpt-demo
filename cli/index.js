#!/usr/bin/env NODE_NO_WARNINGS=1 node --loader=import-jsx

import React, { useState } from 'react';
import { render, Text, Box, Newline } from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';

import * as dotenv from 'dotenv'
dotenv.config()

import { Configuration, OpenAIApi } from "openai";

import { chatBots } from './utils.js'

// Testing directly against ChatGPT can be slow, mock the request to get faster responses.
const MOCK_CHATGPT_REQUEST = process.env.MOCK_CHATGPT_REQUEST || false
const API_KEY = process.env.OPENAI_API_KEY
const STEPS = {
	SELECT_CHAT_BOT: 1,
	PROMPT: 2,
	DISPLAY_ANSWER: 3
}

const ChatGPT = () => {
	const initialState = {
		chatbot: '',
		loading: false,
		question: '',
		answers: [],
		step: STEPS.SELECT_CHAT_BOT,
	}

	const [promptState, setPromptState] = useState(initialState)
	const configuration = new Configuration({ apiKey: API_KEY });
	const openai = new OpenAIApi(configuration);

	const onSelectChatbot = ({ value }) => {
		setPromptState({
			...promptState,
			chatbot: value,
			step: STEPS.PROMPT
		})
	}

	const sendChatGPTRequest = async (messages) => {
		if (MOCK_CHATGPT_REQUEST) {
			const request = new Promise((resolve) => {
				setTimeout(resolve, 1000)
			})
			await request
			return 'This is a mocked response'
		} else {
			const response = await openai.createChatCompletion({
				messages,
				model: "gpt-3.5-turbo",
			});

			return response.data.choices[0].message.content
		}

	}

	const onQuestionSubmit = async () => {
		const { chatbot, question, answers } = promptState
		if (question) {
			setPromptState({
				...promptState,
				loading: true
			})
			const messages = [{ role: "system", content: `Answer as you where ${chatbot}` }, { role: "user", content: question }];
			const answer = await sendChatGPTRequest(messages)
			setPromptState({
				...promptState,
				loading: false,
				answer,
				step: STEPS.DISPLAY_ANSWER,
				answers: [...answers, {
					question,
					answer
				}]
			})
		}
	}

	const onQuestionChange = (question) => {
		setPromptState({
			...promptState,
			question
		})
	}

	const onMoreQuestionsSelect = (answer) => {
		const { chatbot, answers } = promptState
		if (answer.value === 'yes') {
			setPromptState({ ...initialState, chatbot, answers, step: STEPS.PROMPT })
		} else {
			setPromptState({ ...initialState, step: STEPS.SELECT_CHAT_BOT })
		}
	}

	const ChatbotSelector = () => {
		const { step } = promptState
		return <>
			<Text color="green">What type of chatbot would you like to create?</Text>
			<SelectInput items={chatBots} onSelect={onSelectChatbot} isFocused={step === STEPS.SELECT_CHAT_BOT} />
		</>
	}

	const QuestionInput = ({ questionGreetings }) => {
		const { question, loading, chatbot, step } = promptState
		return <>
			<Text color="green">{questionGreetings}</Text>
			<TextInput value={question} onChange={onQuestionChange} onSubmit={onQuestionSubmit} isFocused={step === STEPS.PROMPT} />
			{loading && <Text color="blue"><Spinner type='runner' />&nbsp;Wait a moment, asking to ChatGPT &nbsp;({chatbot}): {question}</Text>}

		</>
	}

	const ChatHistory = () => {
		const { answers, chatbot } = promptState
		return <Box margin={2} flexDirection="column">
			{answers.map(({ question, answer }, index) => {
				return <Box key={index}>
					<Text>
						<Newline />
						<Text italic color="#005cc5">You:</Text> {question}
						<Newline />
						<Text italic color="#005cc5">{chatbot}: </Text>
						{answer}
						<Newline />
					</Text>
				</Box>
			})
			}
		</Box>
	}

	const getPrompt = () => {
		const { chatbot, step } = promptState
		return <>
			{step === STEPS.SELECT_CHAT_BOT && <ChatbotSelector />}
			{[STEPS.PROMPT, STEPS.DISPLAY_ANSWER].includes(step) && <Text>Responding as: {chatbot}</Text>}
			{step === STEPS.PROMPT && <QuestionInput questionGreetings="Perfect!, now tell me your question" />}
			{step === STEPS.DISPLAY_ANSWER && <ChatHistory />}
			{step === STEPS.DISPLAY_ANSWER && <Text>Do you have more questions for {chatbot}?</Text>}
			{step === STEPS.DISPLAY_ANSWER && <SelectInput items={[
				{
					label: 'yes',
					value: 'yes'
				},
				{
					label: 'no',
					value: 'no'
				}
			]} onSelect={onMoreQuestionsSelect} isFocused={step === STEPS.DISPLAY_ANSWER} />}

		</>
	}

	return getPrompt()
};
render(<ChatGPT />);