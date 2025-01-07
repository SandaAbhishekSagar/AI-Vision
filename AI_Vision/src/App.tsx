import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ObjectDetection from './components/ObjectDetection';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      <section id="demo" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-2xl">
              <ObjectDetection />
              
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">How it works</h2>
                <p className="text-gray-600">
                  This application uses TensorFlow.js and the COCO-SSD model to detect objects in real-time 
                  through your webcam. The AI model can recognize various objects and provide confidence scores 
                  for its predictions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />
      <Contact />

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 AI Vision Detection.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;