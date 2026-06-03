
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BookCarousel = ({ slides, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className={cn("relative w-full h-full group overflow-hidden", className)}>
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title || `Slide ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <button
          onClick={prevSlide}
          aria-label="Página anterior"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-foreground shadow-md hover:bg-white dark:hover:bg-slate-800 hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <button
          onClick={nextSlide}
          aria-label="Próxima página"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-foreground shadow-md hover:bg-white dark:hover:bg-slate-800 hover:scale-105 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para página ${index + 1}`}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-white/60 dark:bg-slate-400/60 hover:bg-white dark:hover:bg-slate-300"
            )}
          />
        ))}
      </div>
    </div>
  );
};
