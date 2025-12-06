// AI integration with Google Gemini API
import { products } from './products';

/**
 * Get product recommendation from Gemini AI
 * @param {string} userPreference - User's preference or requirement
 * @returns {Promise<string>} - AI's recommendation response
 */
export async function getRecommendation(userPreference) {
  // Get API key from environment variable
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('API key not found. Please add REACT_APP_GEMINI_API_KEY to your .env file');
  }

  // Prepare product list as text for the AI
  const productList = products.map(p => 
    `${p.name} - $${p.price} (${p.category})`
  ).join('\n');

  // Prepare the prompt with instructions
  const prompt = `You are a product recommendation assistant. Here is the available product list:

${productList}

User's preference: ${userPreference}

Based on the user's preference, recommend ONLY from the products listed above. Explain which product(s) match their needs and why. Be helpful and concise.`;

  // API endpoint
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  // Request body
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  try {
    // Make API call
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the text from the response
    const recommendation = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!recommendation) {
      throw new Error('No recommendation received from AI');
    }

    return recommendation;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
