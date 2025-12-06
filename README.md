# Product Recommendation System with Gemini AI

A React application that uses Google's Gemini AI to recommend products based on user preferences.

## Features

- Static product list display
- AI-powered product recommendations
- Simple and clean user interface
- Integration with Google Gemini Pro 1.5 API

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your API key:**
   - Copy `.env.example` to `.env`:
     ```bash
     copy .env.example .env
     ```
   - Open `.env` and replace `your_gemini_api_key_here` with your actual Gemini API key
   - Get your API key from: https://makersuite.google.com/app/apikey

3. **Start the application:**
   ```bash
   npm start
   ```

4. The app will open in your browser at `http://localhost:3000`

## How to Use

1. View the available products displayed on the screen
2. Type your preference in the text input (e.g., "I want a phone under $500")
3. Click "Get Recommendation" button
4. Wait for AI to analyze and recommend products
5. See the AI's recommendation displayed below

## Project Structure

```
product-recommendation-system/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js          # Main React component
│   ├── products.js     # Product list data
│   ├── ai.js           # Gemini AI API integration
│   ├── index.js        # React app entry point
│   └── index.css       # Basic styling
├── .env.example        # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Technologies Used

- React 18
- Google Gemini Pro 1.5 API
- JavaScript ES6+
- CSS3

## Notes

- Make sure you have a valid Gemini API key
- The API key should never be committed to version control
- Keep your `.env` file private and secure
