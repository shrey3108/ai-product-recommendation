import React, { useState } from 'react';
import { products } from './products';
import { getRecommendation } from './ai';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetRecommendation = async () => {
    // Validate input
    if (!userInput.trim()) {
      setError('Please enter your preference');
      return;
    }

    // Reset states
    setError('');
    setRecommendation('');
    setLoading(true);

    try {
      // Call AI API
      const result = await getRecommendation(userInput);
      setRecommendation(result);
    } catch (err) {
      setError(err.message || 'Failed to get recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛍️ Product Recommendation System</h1>
        <p>Powered by Gemini AI</p>
      </header>

      <main className="App-main">
        {/* Product List Section */}
        <section className="product-section">
          <h2>Available Products</h2>
          <div className="product-list">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <p className="product-category">{product.category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendation Section */}
        <section className="recommendation-section">
          <h2>Get AI Recommendation</h2>
          <div className="input-container">
            <input
              type="text"
              className="preference-input"
              placeholder="E.g., I want a phone under $500"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGetRecommendation()}
              disabled={loading}
            />
            <button
              className="recommend-button"
              onClick={handleGetRecommendation}
              disabled={loading}
            >
              {loading ? 'Getting Recommendation...' : 'Get Recommendation'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Recommendation Result */}
          {recommendation && (
            <div className="recommendation-result">
              <h3>AI Recommendation:</h3>
              <p>{recommendation}</p>
            </div>
          )}
        </section>
      </main>

      <footer className="App-footer">
        <p>Built with React + Google Gemini AI</p>
      </footer>
    </div>
  );
}

export default App;
