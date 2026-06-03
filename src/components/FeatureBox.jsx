
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Camera, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureCard from './FeatureCard.jsx';
import { BookCarousel } from './BookCarousel.jsx';

const features = [
  {
    icon: BookOpen,
    title: 'Guia Personalizado',
    description: 'Crie roteiros mágicos no ritmo da sua família. Cada viagem é um novo capítulo de uma história só de vocês.',
    colorClass: 'text-primary',
    bgClass: 'bg-primary/10'
  },
  {
    icon: Camera,
    title: 'Memórias Eternizadas',
    description: 'Reúna fotos e histórias em um guia que parece um livro de contos. Um tesouro para as crianças revisitarem.',
    colorClass: 'text-secondary',
    bgClass: 'bg-secondary/10'
  },
  {
    icon: Heart,
    title: 'Feito com Amor',
    description: 'Sugestões de passeios que agradam todas as idades, com mapas ilustrados e dicas fáceis de seguir.',
    colorClass: 'text-accent',
    bgClass: 'bg-accent/10'
  }
];

const carouselSlides = [
  {
    image: 'https://horizons-cdn.hostinger.com/55ef0bc5-531f-4703-88b8-d7a7a370f5db/8f98ee1e112586e509ab45c53e58575a.png',
    title: 'Capa do Guia'
  },
  {
    image: 'https://horizons-cdn.hostinger.com/55ef0bc5-531f-4703-88b8-d7a7a370f5db/d4ab8d32cbcde6fdd618b86f7429230d.png',
    title: 'Cristo Redentor'
  },
  {
    image: 'https://horizons-cdn.hostinger.com/55ef0bc5-531f-4703-88b8-d7a7a370f5db/224b98a18b73ae735d4fda8b6a861f87.png',
    title: 'Desenhos para Colorir'
  },
  {
    image: 'https://horizons-cdn.hostinger.com/55ef0bc5-531f-4703-88b8-d7a7a370f5db/9cc0439b39293a8a56d2b32382f3c02b.png',
    title: 'Lugares Favoritos - Londres'
  }
];

const FeatureBox = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

      {/* Left Side: Carousel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, x: -20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative group"
      >
        {/* Decorative background blob */}
        <div className="absolute inset-0 bg-primary/10 rounded-[3rem] blur-3xl transform -rotate-6 scale-95 pointer-events-none" />

        <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-card feature-box-shadow bg-muted aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
          <BookCarousel slides={carouselSlides} className="w-full h-full" />

          {/* Subtle overlay for warmth */}
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none z-20"></div>
        </div>
      </motion.div>

      {/* Right Side: Content */}
      <div className="space-y-10">

        {/* Headers */}
        <div className="text-left">
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
            className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground text-balance"
          >
            Seu Guia Personalizado para a Família
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground font-medium"
          >
            Um livro único com memórias, curiosidades e roteiro completo
          </motion.p>
        </div>

        {/* Feature Cards List */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              colorClass={feature.colorClass}
              bgClass={feature.bgClass}
              delay={0.3 + (index * 0.1)}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="pt-2"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-white shadow-[0_8px_30px_rgb(232,122,93,0.3)] hover:shadow-[0_8px_40px_rgb(232,122,93,0.4)] transition-all duration-300 hover:-translate-y-1 group w-full sm:w-auto"
          >
            <Link to="/create">
              Começar a Criar Seu Guia
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </div>
  );
};

export default FeatureBox;
