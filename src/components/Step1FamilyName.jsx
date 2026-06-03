
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useConversationalGuide } from '@/contexts/ConversationalGuideContext.jsx';
import { Button } from '@/components/ui/button';

const Step1FamilyName = () => {
  const { familyName, updateFamilyName, nextStep } = useConversationalGuide();
  const [localName, setLocalName] = useState(familyName || '');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localName.trim()) return;

    updateFamilyName(localName.trim());
    setIsConfirmed(true);
  };

  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        nextStep();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, nextStep]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
      <AnimatePresence mode="wait">
        {!isConfirmed ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full text-center space-y-10"
            onSubmit={handleSubmit}
          >
            <label htmlFor="familyName" className="block text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
              Qual é o nome da sua família?
            </label>

            <div className="relative max-w-xl mx-auto">
              <input
                id="familyName"
                type="text"
                autoFocus
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                placeholder="Ex: Silva, Oliveira, The Smiths..."
                className="w-full text-2xl md:text-3xl text-center bg-transparent border-b-2 border-border focus:border-primary pb-4 outline-none placeholder:text-muted-foreground/50 transition-colors duration-300 text-primary font-medium"
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: localName.trim() ? 1 : 0 }}
              className="flex justify-center"
            >
              <Button
                type="submit"
                disabled={!localName.trim()}
                className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg hover:-translate-y-1 transition-all"
              >
                Continuar <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <Sparkles className="w-12 h-12 text-primary mx-auto animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Muito prazer, Família <span className="text-primary">{localName}</span>!
            </h2>
            <p className="text-xl text-muted-foreground font-medium">Vamos preparar algo especial para vocês.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Step1FamilyName;
