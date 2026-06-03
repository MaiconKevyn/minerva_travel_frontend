
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Baby, Calendar, Plus, X } from 'lucide-react';
import { useConversationalGuide } from '@/contexts/ConversationalGuideContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const generateId = () => Math.random().toString(36).substr(2, 9);

const EnhancedStep5FamilyDetails = () => {
  const {
    childrenList: contextChildren,
    setChildrenList,
    parentsList: contextParents,
    setParentsList,
    year,
    setYear,
    nextStep
  } = useConversationalGuide();

  const { toast } = useToast();

  // Initialize local state with context data or defaults
  const [children, setChildren] = useState(
    contextChildren.length > 0
      ? contextChildren.map(name => ({ id: generateId(), name }))
      : [{ id: generateId(), name: '' }]
  );

  const [parents, setParents] = useState(
    contextParents.length > 0
      ? contextParents.map(name => ({ id: generateId(), name }))
      : [{ id: generateId(), name: '' }]
  );

  const handleAddChild = () => {
    if (children.length < 10) {
      setChildren([...children, { id: generateId(), name: '' }]);
    }
  };

  const handleRemoveChild = (id) => {
    if (children.length > 1) {
      setChildren(children.filter(c => c.id !== id));
      toast({
        title: "Criança removida",
        description: "A lista foi atualizada.",
        duration: 2000,
      });
    }
  };

  const handleChildChange = (id, value) => {
    setChildren(children.map(c => c.id === id ? { ...c, name: value } : c));
  };

  const handleAddParent = () => {
    if (parents.length < 10) {
      setParents([...parents, { id: generateId(), name: '' }]);
    }
  };

  const handleRemoveParent = (id) => {
    if (parents.length > 1) {
      setParents(parents.filter(p => p.id !== id));
      toast({
        title: "Responsável removido",
        description: "A lista foi atualizada.",
        duration: 2000,
      });
    }
  };

  const handleParentChange = (id, value) => {
    setParents(parents.map(p => p.id === id ? { ...p, name: value } : p));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validChildren = children.filter(c => c.name.trim() !== '');
    const validParents = parents.filter(p => p.name.trim() !== '');

    if (validChildren.length === 0) {
      toast({
        variant: "destructive",
        title: "Atenção",
        description: "Adicione pelo menos uma criança.",
      });
      return;
    }

    if (validParents.length === 0) {
      toast({
        variant: "destructive",
        title: "Atenção",
        description: "Adicione pelo menos um responsável.",
      });
      return;
    }

    // Save to context
    setChildrenList(validChildren.map(c => c.name.trim()));
    setParentsList(validParents.map(p => p.name.trim()));

    nextStep();
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col min-h-[60vh] justify-center py-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          Detalhes da Família
        </h2>
        <p className="text-xl text-muted-foreground font-medium">
          Para deixar o guia ainda mais especial, conte-nos quem vai participar dessa aventura.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Children Section */}
        <div className="bg-card dark:bg-slate-800/50 p-6 md:p-8 rounded-[2rem] shadow-sm border-2 border-primary/10">
          <div className="flex items-center justify-between mb-6">
            <Label className="text-xl font-bold flex items-center gap-3 text-foreground">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                <Baby className="w-6 h-6" />
              </div>
              Crianças
            </Label>
            <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {children.length} de 10
            </span>
          </div>

          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {children.map((child, index) => (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <Input
                    value={child.name}
                    onChange={(e) => handleChildChange(child.id, e.target.value)}
                    placeholder={`Nome da criança ${index + 1}`}
                    className="text-lg py-6 rounded-xl bg-background border-border focus-visible:ring-primary text-foreground placeholder:text-muted-foreground"
                  />
                  {children.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveChild(child.id)}
                      className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl h-12 w-12"
                      aria-label="Remover criança"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleAddChild}
            disabled={children.length >= 10}
            className="w-full mt-4 py-6 rounded-xl border-dashed border-2 hover:border-primary hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Criança
          </Button>
        </div>

        {/* Parents Section */}
        <div className="bg-card dark:bg-slate-800/50 p-6 md:p-8 rounded-[2rem] shadow-sm border-2 border-secondary/10">
          <div className="flex items-center justify-between mb-6">
            <Label className="text-xl font-bold flex items-center gap-3 text-foreground">
              <div className="p-2 bg-secondary/10 rounded-xl text-secondary">
                <Users className="w-6 h-6" />
              </div>
              Responsáveis
            </Label>
            <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {parents.length} de 10
            </span>
          </div>

          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {parents.map((parent, index) => (
                <motion.div
                  key={parent.id}
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <Input
                    value={parent.name}
                    onChange={(e) => handleParentChange(parent.id, e.target.value)}
                    placeholder={`Nome do responsável ${index + 1}`}
                    className="text-lg py-6 rounded-xl bg-background border-border focus-visible:ring-secondary text-foreground placeholder:text-muted-foreground"
                  />
                  {parents.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveParent(parent.id)}
                      className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl h-12 w-12"
                      aria-label="Remover responsável"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleAddParent}
            disabled={parents.length >= 10}
            className="w-full mt-4 py-6 rounded-xl border-dashed border-2 hover:border-secondary hover:bg-secondary/5 text-muted-foreground hover:text-secondary transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Responsável
          </Button>
        </div>

        {/* Year Section */}
        <div className="bg-card dark:bg-slate-800/50 p-6 md:p-8 rounded-[2rem] shadow-sm border-2 border-accent/10">
          <Label htmlFor="year" className="text-xl font-bold flex items-center gap-3 text-foreground mb-6">
            <div className="p-2 bg-accent/10 rounded-xl text-accent">
              <Calendar className="w-6 h-6" />
            </div>
            Ano da Viagem
          </Label>
          <Input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
            placeholder="Ex: 2026"
            className="text-lg py-6 rounded-xl bg-background border-border focus-visible:ring-accent text-foreground placeholder:text-muted-foreground"
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

export default EnhancedStep5FamilyDetails;
