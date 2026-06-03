
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { useConversationalGuide } from '@/contexts/ConversationalGuideContext.jsx';
import { Button } from '@/components/ui/button';

const Step3Destination = () => {
  const { destination, updateDestination, nextStep } = useConversationalGuide();
  const [localDest, setLocalDest] = useState(destination || '');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localDest.trim()) return;

    updateDestination(localDest.trim());
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

  const wordCount = localDest.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
      <AnimatePresence mode="wait">
        {!isConfirmed ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full text-center space-y-8"
            onSubmit={handleSubmit}
          >
            <label htmlFor="destination" className="block text-3xl md:text-4xl font-serif font-bold text-foreground leading-tight">
              Me conte onde está pretendendo ir, quais cidades, países, o que vocês querem fazer lá... Fale livremente!
            </label>

            <div className="relative w-full mx-auto text-left">
              <textarea
                id="destination"
                autoFocus
                value={localDest}
                onChange={(e) => setLocalDest(e.target.value)}
                placeholder="Ex: Estamos pensando em visitar Paris, depois ir para Londres... Queremos ver museus, comer em restaurantes locais, fazer compras..."
                className="w-full min-h-[180px] p-6 rounded-3xl border-2 border-border bg-card dark:bg-slate-800 focus:border-secondary focus:ring-4 focus:ring-secondary/20 outline-none transition-all text-lg font-medium resize-none shadow-sm text-foreground placeholder:text-muted-foreground/60"
              />
              <div className="flex justify-between items-center mt-3 px-2">
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> Destino dos sonhos
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {wordCount} {wordCount === 1 ? 'palavra' : 'palavras'}
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: localDest.trim() ? 1 : 0 }}
              className="flex justify-center pt-4"
            >
              <Button
                type="submit"
                disabled={!localDest.trim()}
                className="rounded-full px-10 py-6 bg-secondary hover:bg-secondary/90 text-white font-bold text-lg shadow-lg hover:-translate-y-1 transition-all"
              >
                Próximo <ArrowRight className="ml-2 w-5 h-5" />
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
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
              <Sparkles className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Que roteiro incrível!
            </h2>
            <p className="text-xl text-muted-foreground font-medium">
              Vamos preparar algo muito especial para essa viagem.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Step3Destination;
