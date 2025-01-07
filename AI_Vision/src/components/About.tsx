import React from 'react';
import { Code2, Eye, Zap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">About Our Technology</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Real-Time Detection</h3>
            <p className="text-gray-600 text-center">
              Advanced AI algorithms process video streams in real-time for instant object detection and recognition.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 mx-auto">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">High Performance</h3>
            <p className="text-gray-600 text-center">
              Optimized for browser environments, ensuring smooth performance without requiring any installations.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 mx-auto">
              <Code2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Open Source</h3>
            <p className="text-gray-600 text-center">
              Built with cutting-edge open-source technologies, making it accessible and customizable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;