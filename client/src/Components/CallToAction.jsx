import { Button } from "flowbite-react";
import LinkedInProfile from "../assets/LinkedIn.svg";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-8 border border-teal-500 justify-center items-center rounded-2xl text-center bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex-1 justify-center flex flex-col p-6">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
          Let's Connect on LinkedIn
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Join my professional network to stay updated with my latest articles, 
          tech insights, and development journey. Let's grow and learn together!
        </p>
        <div className="flex justify-center">
          <Button
            gradientDuoTone="purpleToPink"
            className="rounded-full px-8 py-2 transform hover:scale-105 transition-transform duration-300"
            size="lg"
          >
            <a
              href="https://www.linkedin.com/in/harsh-dodiya-197283255/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>Connect on LinkedIn</span>
              <svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-6">
        <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
          <img 
            src={LinkedInProfile} 
            alt="LinkedIn Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
