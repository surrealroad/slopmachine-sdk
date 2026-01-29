import React, { useState, useEffect } from 'react';
import { SlopImage } from '../../src/index';

function App() {
  const [location, setLocation] = useState('London');
  const [weather, setWeather] = useState('Rainy');
  const [style, setStyle] = useState('Oil Painting');
  const [date, setDate] = useState(new Date().toLocaleDateString());

  // Mock auto-update date/weather?
  useEffect(() => {
    // Just for demo vibes
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Controls */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Slop Machine SDK</h1>
            <p className="text-neutral-400">"Just-in-Time" Assets Demo</p>
          </div>

          <div className="space-y-4 bg-neutral-800 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-xl font-semibold mb-4">Context Variables</h2>
            
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Location</label>
              <select 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded p-2"
              >
                <option>London</option>
                <option>Tokyo</option>
                <option>New York</option>
                <option>Mars</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-neutral-400 mb-1">Weather</label>
              <select 
                value={weather} 
                onChange={(e) => setWeather(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded p-2"
              >
                <option>Rainy</option>
                <option>Sunny</option>
                <option>Snowing</option>
                <option>Apocalyptic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-neutral-400 mb-1">Style</label>
              <select 
                value={style} 
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded p-2"
              >
                <option>Oil Painting</option>
                <option>Cyberpunk</option>
                <option>Minimalist Vector</option>
                <option>Claymation</option>
              </select>
            </div>
          </div>

          <div className="bg-black p-4 rounded-xl border border-neutral-800 font-mono text-sm overflow-x-auto">
            <p className="text-purple-400">{'<SlopImage'}</p>
            <p className="pl-4 text-green-400">prompt=<span className="text-yellow-200">"A beautiful scene in {'{location}'}, weather is {'{weather}'}..."</span></p>
            <p className="pl-4 text-blue-400">location=<span className="text-white">"{location}"</span></p>
            <p className="pl-4 text-blue-400">weather=<span className="text-white">"{weather}"</span></p>
            <p className="pl-4 text-blue-400">style=<span className="text-white">"{style}"</span></p>
            <p className="pl-4 text-blue-400">date=<span className="text-white">"{date}"</span></p>
            <p className="text-purple-400">{'/>'}</p>
          </div>
        </div>

        {/* Output */}
        <div className="sticky top-8">
          <div className="aspect-square bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl relative group">
            <SlopImage 
              prompt="A beautiful scene in {location}, where the weather is {weather}, there are flying pigs in the background somewhere, and there is the text 'Slop Machine was here {date}', all in the style of {style}"
              location={location}
              weather={weather}
              style={style}
              date={date}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs text-white/70">Generated via Vertex AI</p>
            </div>
          </div>
          <p className="text-center mt-4 text-neutral-500 text-sm">
            Updates automatically when props change (Cached = Instant)
          </p>
        </div>

      </div>
    </div>
  )
}

export default App
