
import React from 'react';

export const Flower = ({ className = "w-12 h-12 text-primary", style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 20C55 10 70 10 75 25C80 40 65 45 50 50C35 45 20 40 25 25C30 10 45 10 50 20Z" opacity="0.8" />
    <path d="M50 80C55 90 70 90 75 75C80 60 65 55 50 50C35 55 20 60 25 75C30 90 45 90 50 80Z" opacity="0.8" />
    <path d="M20 50C10 45 10 30 25 25C40 20 45 35 50 50C45 65 40 80 25 75C10 70 10 55 20 50Z" opacity="0.8" />
    <path d="M80 50C90 45 90 30 75 25C60 20 55 35 50 50C55 65 60 80 75 75C90 70 90 55 80 50Z" opacity="0.8" />
    <circle cx="50" cy="50" r="10" fill="currentColor" className="text-background" opacity="0.9" />
  </svg>
);

export const Airplane = ({ className = "w-12 h-12 text-secondary", style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M85 30C88 27 88 23 85 20C82 17 78 17 75 20L45 50L20 45L15 55L35 65L25 75L10 75L5 85L25 90L35 70L45 80L55 75L65 55L95 25Z" />
    <path d="M85 30C88 27 88 23 85 20C82 17 78 17 75 20L45 50L65 55L95 25Z" fill="currentColor" className="text-background" opacity="0.3" />
  </svg>
);

export const Suitcase = ({ className = "w-12 h-12 text-accent", style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="35" width="70" height="50" rx="10" />
    <path d="M35 35V25C35 20 40 15 50 15C60 15 65 20 65 25V35" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    <rect x="25" y="45" width="50" height="30" rx="5" fill="currentColor" className="text-background" opacity="0.2" />
    <line x1="35" y1="35" x2="35" y2="85" stroke="currentColor" className="text-background" strokeWidth="4" opacity="0.4" />
    <line x1="65" y1="35" x2="65" y2="85" stroke="currentColor" className="text-background" strokeWidth="4" opacity="0.4" />
  </svg>
);

export const Sun = ({ className = "w-12 h-12 text-primary", style }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="25" />
    <path d="M50 10V20M50 80V90M10 50H20M80 50H90M22 22L29 29M71 71L78 78M22 78L29 71M71 29L78 22" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
  </svg>
);
