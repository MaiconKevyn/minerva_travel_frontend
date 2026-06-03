
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Camera, Map, Lightbulb, Gift, Wand2 } from 'lucide-react';
import BookCover from './BookCover.jsx';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Heart,
    title: 'Memórias Personalizadas',
    description: 'Transforme o planejamento em uma história única para a sua família.',
    color: 'text-primary',
    bg: 'bg-primary/10'
  },
  {
    icon: Camera,
    title: 'Fotos da Família',
    description: 'A capa leva a foto de vocês, tornando o guia um item exclusivo.',
    color: 'text-secondary',
    bg: 'bg-secondary/10'
  },
  {
    icon: Map,
    title: 'Roteiro Completo',
    description: 'Destinos e atrações organizados em uma narrativa mágica.',
    color: 'text-accent',
    bg: 'bg-accent/10'
  },
  {
    icon: Lightbulb,
    title: 'Curiosidades',
    description: 'Fatos divertidos para manter as crianças engajadas no passeio.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  },
  {
    icon: Gift,
    title: 'Presente Especial',
    description: 'Gere um lindo PDF pronto para imprimir e guardar de recordação.',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10'
  },
  {
    icon: Wand2,
    title: 'Fácil de Criar',
    description: 'Uma jornada rápida de 6 passos com a ajuda da nossa inteligência.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10'
  }
];

const ProductShowcase = () => {
  return (
    <section className="py-24 bg-card relative transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-widest uppercase text-sm mb-3 block"
          >
            A Magia do Planejamento
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground text-balance"
          >
            Crie um Guia Personalizado para Sua Família
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto"
          >
            O seu roteiro de viagem se transforma num incrível livro de aventuras, repleto de curiosidades e espaços para registrar as melhores memórias com as crianças.
          </motion.p>
        </div>

        {/* Main Content: Book Mockup (Left) & Benefits Grid (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: 3D Book Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform -rotate-6 scale-75 pointer-events-none" />
            <BookCover
              destination="Itália e França"
              familyName="Família Almeida"
              childrenNames="Lucas & Clara"
              year={2026}
              coverPhoto="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
            />
          </motion.div>

          {/* Right: Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 dark:border-slate-700 bg-background hover:border-primary/30 transition-colors shadow-sm hover:shadow-md">
                  <CardContent className="p-6 flex flex-col items-start text-left h-full">
                    <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-4 transform -rotate-3`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
