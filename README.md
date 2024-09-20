# Stackup News & Stackie Gemini bot

This project is a web application that utilizes the Gemini 1.5 Pro model to generate newsletters from world news fetched via the Mediastack API. Additionally, the site features a chatbot named Stackie, which answers questions related to Stackup using a predefined knowledge base.

## Features

- Fetches live news articles from the Mediastack API.
- Generates newsletters using the Gemini 1.5 Pro model.
- Chatbot (Stackie) that provides answers to Stackup-related questions.
- Knowledge base to limit questions to Stackup topics only.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (version 14.x or higher)
- **npm** (Node Package Manager, comes with Node.js)
- **Environment Variables**: You will need an API key for both the Mediastack and Gemini APIs.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Charlo-tech/news-chat.git
   cd news-chat
   
2. **Install dependencies**:

```bash
npm install
```

3. **Create a .env file in the root of the project directory and add your API keys**:

```
MEDIASTACK_API_KEY=your_mediastack_api_key
GEMINI_API_KEY=your_gemini_api_key

```
4. **Run the application**:

```
npm run dev
```
The application will start on http://localhost:3000.
![Screenshot (378)](https://github.com/user-attachments/assets/30973f25-ada0-4867-aff2-a3eccbf5c752)


## Usage
Fetching News: The application fetches news articles and displays them on the homepage.
![Screenshot (379)](https://github.com/user-attachments/assets/8ec9d1ac-15c1-4e6f-ad5d-ce8034ccbea0)

Generating Newsletters: Click the "Generate Newsletter from News" button to create a newsletter from the fetched articles.
![Screenshot (381)](https://github.com/user-attachments/assets/aa9ef47b-900b-492d-8099-af9ee8ef0f9c)
Chat with Stackie: Ask Stackie questions related to Stackup after providing your name. Stackie will respond based on the knowledge base.
![Screenshot (380)](https://github.com/user-attachments/assets/868d16d8-ad8a-4750-b4e4-0f8dd2c977d4)


## Contributing

**If you would like to contribute to this project, please follow these steps**:

<ol>
<li>Fork the project.</li>
<li>Create your feature branch: git checkout -b feature/YourFeature.</li>
<li>Commit your changes: git commit -m 'Add some feature'.</li>
<li>Push to the branch: git push origin feature/YourFeature.</li>
<li>Open a Pull Request.</li>
</ol>

## video demo


https://github.com/user-attachments/assets/3252f65b-f55b-40ae-ab6f-743ab7a66eca

