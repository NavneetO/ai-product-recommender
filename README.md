🛍️ AI Product Recommendation System

An interactive React + Node.js application that recommends products using AI (OpenAI GPT model) based on user preferences.

“Tell the AI what you’re looking for — it’ll recommend the perfect products for you.”

🚀 Features

🧠 AI-Powered Recommendations: Uses OpenAI’s GPT model to select the best products from a static product list.

💬 Natural Language Input: Type queries like “I want a phone under $500 with a good camera.”

⚡ Real-Time Responses: See product suggestions and a brief explanation instantly.

🎨 Modern UI: Built with React, TailwindCSS, and Lucide Icons.

🔌 Backend Integration: Node.js + Express server connects securely to the OpenAI API.

🧩 Project Structure
product-recommender/
│
├── client/ (React frontend)
│   ├── src/
│   │   ├── App.js              # Main React component
│   │   └── index.js            # React entry point
│   ├── public/
│   └── package.json
│
├── server.js                    # Node.js backend API
├── .env                         # Contains your OpenAI API key
├── README.md                    # Project documentation
└── package.json                 # Backend dependencies

⚙️ Installation Guide
1️⃣ Clone the Repository
git clone https://github.com/yourusername/product-recommender.git
cd product-recommender

2️⃣ Install Dependencies

Run this once in the root folder:

npm install express cors openai dotenv


Then inside the React app folder (if applicable):

cd client
npm install

🔐 Environment Setup

Create a .env file in your project root (same folder as server.js) and add your OpenAI API key:

OPENAI_API_KEY=sk-your-real-openai-key-here


⚠️ Never commit your API key to GitHub or share it publicly.

▶️ Running the App
Step 1: Start Backend

In one terminal:

node server.js


Server runs on:
👉 http://localhost:5000

Step 2: Start Frontend

In another terminal:

npm start


Then visit
👉 http://localhost:3000

💡 How It Works

The user types a preference (e.g., “I want a phone under $500”).

The React app sends this query to the Node.js backend (/api/recommend).

The backend prompts OpenAI GPT with product data and returns a filtered recommendation list.

The React app displays AI’s recommended products with an explanation.

🧱 Tech Stack
Layer	Technology
Frontend	React (CRA), TailwindCSS, Lucide Icons
Backend	Node.js, Express
AI	OpenAI GPT API
Environment	dotenv for secure key handling
🧰 Example Query

Input:

I want a phone under $500 with good battery life.

AI Output:

Google Pixel 7 — excellent camera and battery, under $500.

Motorola Edge 40 — OLED display, good battery performance.

🧪 Troubleshooting
Issue	Solution
Error: Missing credentials	Ensure .env file is in the root with OPENAI_API_KEY.
CORS error	Confirm backend is running on port 5000 and cors() is enabled.
Invalid response from AI API	Update server.js to use chat.completions.create and return { content: response }.
🧑‍💻 Future Improvements

✅ Add real product images and links

🔍 Filter by category, price, or specs

🧾 Store user search history

🧠 Cache frequent queries for faster responses

📜 License

This project is open-sourced under the MIT License.
