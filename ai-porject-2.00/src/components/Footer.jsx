import React from 'react';
import { Compass } from 'lucide-react';

function Footer() {
  return (
    <footer className="py-8 px-4 bg-indigo-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-indigo-400 animate-pulse"></div>
        <div className="absolute top-4 right-1/4 h-16 w-16 rounded-full bg-indigo-500 animate-ping" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 h-24 w-24 rounded-full bg-indigo-300 animate-pulse" style={{animationDuration: '5s'}}></div>
      </div>
      
      <div className="container mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0 group">
            <Compass className="h-6 w-6 text-indigo-300 group-hover:rotate-45 transition-transform duration-500" />
            <span className="text-xl font-bold relative">
            GoGenie
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-300 group-hover:w-full transition-all duration-300"></span>
            </span>
          </div>
          
          <div className="flex gap-6">
            {['About', 'Contact', 'Privacy', 'Terms'].map((item, index) => (
              <a 
                key={item} 
                href="#" 
                className="text-indigo-300 hover:text-white transition-colors relative overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-300 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-6 text-center text-indigo-400 text-sm opacity-0 animate-fadeIn" style={{animation: 'fadeIn 1s forwards 0.5s'}}>
          © 2025 GoGenie. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// Add these to your global CSS or tailwind config
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// }

export default Footer;