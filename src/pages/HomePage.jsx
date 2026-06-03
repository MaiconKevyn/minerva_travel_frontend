
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import FeatureBox from '@/components/FeatureBox.jsx';
import { Flower, Airplane, Suitcase } from '@/components/DecorativeElements.jsx';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Aventuras em Família - O seu guia de viagem ilustrado</title>
        <meta name="description" content="Crie guias de viagem personalizados como livros de histórias para a sua família. Transforme cada viagem em uma aventura mágica." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background transition-colors duration-200">
        <Header />

        {/* Storybook Hero Section */}
        <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden flex-1 flex items-center">
          <Flower className="absolute top-10 right-10 w-24 h-24 text-primary opacity-20" />
          <Airplane className="absolute top-32 left-10 w-20 h-20 text-secondary opacity-20" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm text-sm font-medium text-secondary border border-border/50">
                  <Sparkles className="w-4 h-4" />
                  Sua próxima aventura começa aqui
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-[1.1] text-foreground">
                  Crie o Guia de Viagem da <span className="text-primary relative inline-block">
                    Sua Família
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                      <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
                    </svg>
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                  Transforme o planejamento das férias em um divertido livro de histórias. Adicione destinos, fotos e veja a mágica acontecer.
                </p>

                <div className="pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-white shadow-[0_8px_30px_rgb(232,122,93,0.3)] hover:shadow-[0_8px_40px_rgb(232,122,93,0.4)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <Link to="/create">
                      Começar Agora
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-secondary/20 rounded-[100px] blur-3xl transform rotate-12 scale-110"></div>

                <div className="relative rounded-[40px] overflow-hidden border-8 border-card shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://horizons-cdn.hostinger.com/55ef0bc5-531f-4703-88b8-d7a7a370f5db/41b7627d2fe05fb459992abfe76821db.png"
                    alt="Watercolor illustration of a happy family with backpacks and camera in front of European landmarks, surrounded by colorful flowers"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                  <div className="absolute inset-0 bg-[#E87A5D] mix-blend-overlay opacity-20 pointer-events-none"></div>
                </div>

                <Suitcase className="absolute -bottom-6 -right-6 w-24 h-24 text-accent drop-shadow-lg transform -rotate-12" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Guia Personalizado Showcase Section */}
        <section className="py-24 bg-card relative transition-colors duration-200 overflow-hidden border-t border-border/50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.02\'/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FeatureBox />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-muted py-12 border-t border-border mt-auto relative overflow-hidden transition-colors duration-200">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.02\'/%3E%3C/svg%3E')] opacity-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-card rounded-xl shadow-sm flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <span className="font-serif font-bold text-xl text-foreground">Aventuras em Família</span>
              </div>
              <div className="flex gap-8 text-sm font-medium">
                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Política de Privacidade</span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Termos de Uso</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                © 2026 Histórias Mágicas Ltda.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
