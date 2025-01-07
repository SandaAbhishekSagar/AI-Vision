import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-12 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            AI Vision Detection
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience real-time object detection powered by advanced AI technology.
            Simply allow camera access and watch as our system identifies objects instantly.
          </p>
          <a
            href="#demo"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Try Demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;