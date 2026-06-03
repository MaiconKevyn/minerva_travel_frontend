
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Baby, Calendar } from 'lucide-react';
import { useConversationalGuide } from '@/contexts/ConversationalGuideContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Step5FamilyDetails = () => {
  const {
    childrenNames,
    setChildrenNames,
    parentsNames,
    setParentsNames,
    year,
    setYear,
    nextStep
  } = useConversationalGuide();

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col min-h-[60vh] justify-center py-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          Detalhes da Família
        </h2>
        <p className="text-xl text-muted-foreground font-medium">
          Para deixar o guia ainda mais especial, conte-nos um pouco mais sobre vocês. (Opcional)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-card dark:bg-slate-800 p-8 md:p-10 rounded-[32px] shadow-sm border-2 border-border/50 dark:border-slate-700">

        <div className="space-y-4">
          <Label htmlFor="childrenNames" className="text-lg font-bold flex items-center gap-2 text-foreground">
            <Baby className="w-5 h-5 text-primary" /> Quais são os nomes das crianças?
          </Label>
          <Input
            id="childrenNames"
            value={childrenNames}
            onChange={(e) => setChildrenNames(e.target.value)}
            placeholder="Ex: João e Maria"
            className="text-lg py-6 rounded-2xl bg-muted/50 border-border focus-visible:ring-primary text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="parentsNames" className="text-lg font-bold flex items-center gap-2 text-foreground">
            <Users className="w-5 h-5 text-secondary" /> Quais são os nomes dos pais?
          </Label>
          <Input
            id="parentsNames"
            value={parentsNames}
            onChange={(e) => setParentsNames(e.target.value)}
            placeholder="Ex: Ana e Carlos"
            className="text-lg py-6 rounded-2xl bg-muted/50 border-border focus-visible:ring-primary text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="year" className="text-lg font-bold flex items-center gap-2 text-foreground">
            <Calendar className="w-5 h-5 text-accent" /> Qual ano da viagem?
          </Label>
          <Input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value) || 2026)}
            placeholder="2026"
            className="text-lg py-6 rounded-2xl bg-muted/50 border-border focus-visible:ring-primary text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="pt-8 flex justify-center">
          <Button
            type="submit"
            className="rounded-full px-12 py-8 bg-primary hover:bg-primary/90 text-white font-bold text-xl shadow-xl hover:-translate-y-1 transition-all"
          >
            Continuar <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step5FamilyDetails;
