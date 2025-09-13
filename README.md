# weather-agent

AI Assistant with Tool Use (Weather Example)

This project demonstrates how to build an AI Assistant that follows a structured reasoning workflow with PLAN → ACTION → OBSERVATION → OUTPUT states.
The assistant can dynamically decide which tools to use, execute them, and incorporate the results back into its reasoning process.

✨ Features

Uses OpenAI GPT model (gpt-4o) for reasoning.

Follows a structured JSON format for communication.

Implements a tool-calling mechanism:

getweatherDetails(city: string) → returns mock weather data for predefined cities.

Example: Ask “What is the sum of weather of Pune and Mumbai?”, and the AI will:

Plan which function to call.

Call the tool (getweatherDetails).

Receive the observation.

Output the final computed result.

🛠️ Tech Stack

Node.js (JavaScript/ESM imports)

OpenAI Node.js SDK

readline-sync (for CLI input)

🚀 How It Works

The user provides input in natural language.

The AI assistant first responds with a plan.

It then performs an action by calling the corresponding tool.

The tool returns an observation.

Based on the observation, the assistant generates the final output.

Installation

# Clone the repository
git clone https://github.com/your-username/ai-assistant-weather.git
cd ai-assistant-weather

# Install dependencies
npm install

🔑 Setup

Get an OpenAI API key from OpenAI
.

Replace YOUR_API_KEY in the code with your actual key.

▶️ Run

node index.js
