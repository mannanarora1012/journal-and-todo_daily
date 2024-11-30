import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-center">
      <div className="text-white/80 flex items-center justify-center gap-4 text-sm md:text-base flex-wrap">
        <span className="font-semibold">Created by Mannan Arora</span>
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/mannanarora1012"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/mannanarora1012"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};