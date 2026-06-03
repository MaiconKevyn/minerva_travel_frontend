
import React from 'react';
import { Plus, X, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import WarmCard from './WarmCard.jsx';
import { Sun } from './DecorativeElements.jsx';

const FamilyInfoForm = ({ familyName, onFamilyNameChange, children, onChildrenChange, errors }) => {
  const addChild = () => {
    onChildrenChange([...children, '']);
  };

  const removeChild = (index) => {
    const newChildren = children.filter((_, i) => i !== index);
    onChildrenChange(newChildren);
  };

  const updateChild = (index, value) => {
    const newChildren = [...children];
    newChildren[index] = value;
    onChildrenChange(newChildren);
  };

  return (
    <WarmCard className="border-t-4 border-t-secondary relative">
      <Sun className="absolute -bottom-6 -right-6 w-24 h-24 text-primary/10 rotate-12" />

      <div className="mb-8">
        <h3 className="text-3xl font-serif font-bold mb-2 flex items-center gap-3">
          <Users className="w-8 h-8 text-secondary" />
          Sobre Vocês
        </h3>
        <p className="text-muted-foreground text-lg">Nos conte quem fará parte dessa aventura incrível.</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="familyName" className="text-base font-medium">Nome da Família</Label>
          <Input
            id="familyName"
            type="text"
            placeholder="Ex: Família Silva"
            value={familyName}
            onChange={(e) => onFamilyNameChange(e.target.value)}
            className="h-14 rounded-2xl text-lg px-5 bg-background border-border focus-visible:ring-secondary focus-visible:border-secondary transition-all"
          />
          {errors.familyName && (
            <p className="text-sm font-medium text-destructive bg-destructive/10 py-1.5 px-3 rounded-lg inline-block">
              {errors.familyName}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Crianças (ou outros viajantes)</Label>
            <Button
              type="button"
              variant="outline"
              onClick={addChild}
              className="rounded-full border-secondary/30 text-secondary hover:bg-secondary hover:text-white transition-all duration-200 active:scale-95"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Membro
            </Button>
          </div>

          <AnimatePresence mode="popLayout">
            {children.map((child, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex gap-3 items-center bg-muted/40 p-2 rounded-2xl"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-serif font-bold text-secondary shadow-sm">
                  {index + 1}
                </div>
                <Input
                  type="text"
                  placeholder={`Nome do aventureiro ${index + 1}`}
                  value={child}
                  onChange={(e) => updateChild(index, e.target.value)}
                  className="flex-1 h-12 rounded-xl bg-white border-transparent focus-visible:ring-secondary"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeChild(index)}
                  className="rounded-full hover:bg-destructive/10 hover:text-destructive w-10 h-10 mr-1 transition-colors"
                >
                  <X className="w-5 h-5" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>

          {children.length === 0 && (
            <div className="bg-muted rounded-2xl p-6 text-center border border-dashed border-border">
              <p className="text-muted-foreground">
                Nenhuma criança adicionada ainda. Clique acima para incluir aventureiros!
              </p>
            </div>
          )}

          {errors.children && (
            <p className="text-sm font-medium text-destructive bg-destructive/10 py-1.5 px-3 rounded-lg inline-block">
              {errors.children}
            </p>
          )}
        </div>
      </div>
    </WarmCard>
  );
};

export default FamilyInfoForm;
