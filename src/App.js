import React, { useState } from 'react';
import { ShoppingBag, Search, Loader2, Sparkles } from 'lucide-react';

const products = [
  { id: 1, name: "iPhone 14", category: "Phone", price: 799, specs: "128GB, 6.1 inch display, A15 Bionic chip" },
  { id: 2, name: "Samsung Galaxy S23", category: "Phone", price: 699, specs: "256GB, 6.1 inch AMOLED, Snapdragon 8 Gen 2" },
  { id: 3, name: "Google Pixel 7", category: "Phone", price: 449, specs: "128GB, 6.3 inch OLED, Tensor G2 chip" },
  { id: 4, name: "OnePlus 11", category: "Phone", price: 599, specs: "256GB, 6.7 inch AMOLED, Snapdragon 8 Gen 2" },
  { id: 5, name: "Motorola Edge 40", category: "Phone", price: 399, specs: "128GB, 6.55 inch OLED, MediaTek Dimensity 8020" },
  { id: 6, name: "MacBook Air M2", category: "Laptop", price: 1199, specs: "13 inch, 8GB RAM, 256GB SSD, M2 chip" },
  { id: 7, name: "Dell XPS 13", category: "Laptop", price: 999, specs: "13.4 inch, Intel i7, 16GB RAM, 512GB SSD" },
  { id: 8, name: "HP Pavilion 15", category: "Laptop", price: 649, specs: "15.6 inch, AMD Ryzen 5, 8GB RAM, 512GB SSD" },
  { id: 9, name: "Sony WH-1000XM5", category: "Headphones", price: 399, specs: "Noise cancelling, 30hr battery, Bluetooth 5.2" },
  { id: 10, name: "AirPods Pro 2", category: "Headphones", price: 249, specs: "Active noise cancellation, 6hr battery, USB-C" },
  { id: 11, name: "Samsung Galaxy Buds 2", category: "Headphones", price: 149, specs: "Active noise cancellation, 5hr battery" },
  { id: 12, name: "iPad Air", category: "Tablet", price: 599, specs: "10.9 inch, M1 chip, 64GB storage" },
  { id: 13, name: "Samsung Galaxy Tab S8", category: "Tablet", price: 699, specs: "11 inch, Snapdragon 8 Gen 1, 128GB" },
  { id: 14, name: "Apple Watch Series 9", category: "Smartwatch", price: 399, specs: "GPS, Always-on display, Health tracking" },
  { id: 15, name: "Fitbit Charge 6", category: "Smartwatch", price: 159, specs: "Heart rate, GPS, 7 day battery" }
];

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');

  const getRecommendations = async () => {
    if (!userInput.trim()) {
      setError('Please enter your preferences');
      return;
    }

    setLoading(true);
    setError('');
    setRecommendations([]);
    setAiResponse('');

    try {
      // Call your local backend that uses OpenAI SDK
      const response = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `You are a product recommendation assistant. Based on the user's preferences, recommend products from the following list. 
          Return ONLY a JSON array of product IDs that match their criteria, nothing else.
          
          User preferences: "${userInput}"
          
          Available products:
          ${products.map(p => `ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Price: $${p.price}, Specs: ${p.specs}`).join('\n')}
          
          Return format:
          {
            "productIds": [1, 2, 3],
            "explanation": "Brief explanation here"
          }`,
        }),
      });

      const data = await response.json();

      // Handle GPT output from the backend
      if (data.content) {
        const textContent = data.content;

        // Try to extract JSON if GPT wrapped it in text
        const jsonMatch = textContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          const recommendedProducts = products.filter((p) =>
            parsed.productIds.includes(p.id)
          );

          setRecommendations(recommendedProducts);
          setAiResponse(parsed.explanation);
        } else {
          setError("Unable to parse AI recommendations");
        }
      } else {
        setError("Invalid response from AI API");
      }
    } catch (err) {
      setError("Error getting recommendations: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }; // ✅ <-- this was missing!

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getRecommendations();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShoppingBag className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-800">AI Product Finder</h1>
          </div>
          <p className="text-gray-600">Tell us what you're looking for, and AI will find the perfect match</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., I want a phone under $500 with good camera"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <button
              onClick={getRecommendations}
              disabled={loading}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 font-semibold transition"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Find Products
                </>
              )}
            </button>
          </div>
          {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
        </div>

        {/* AI Explanation */}
        {aiResponse && (
          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-purple-900 mb-1">AI Recommendation</h3>
                <p className="text-purple-800">{aiResponse}</p>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Recommended Products ({recommendations.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 border-2 border-purple-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                    <span className="text-2xl font-bold text-purple-600">
                      ${product.price}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.specs}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        {recommendations.length === 0 && !loading && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              All Available Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                    <span className="text-2xl font-bold text-gray-700">${product.price}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.specs}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
