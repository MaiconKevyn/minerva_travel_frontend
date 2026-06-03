
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Heart, ShieldCheck, Sparkles, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import { Flower, Airplane } from '@/components/DecorativeElements.jsx';

const PricingPage = () => {
  const features = [
    "Guia personalizado com memórias",
    "Desenhos para colorir",
    "Roteiro completo da viagem",
    "Fotos e momentos especiais",
    "Personalização com nomes da família"
  ];

  return (
    <>
      <Helmet>
        <title>Preços - Aventuras em Família</title>
        <meta name="description" content="Conheça nossos planos e crie um guia de viagem inesquecível para sua família." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background transition-colors duration-200">
        <Header />

        <main className="flex-1 relative overflow-hidden py-16 lg:py-24">
          {/* Decorative Background Elements */}
          <Flower className="absolute top-20 left-10 w-32 h-32 text-primary opacity-10 transform -rotate-12" />
          <Airplane className="absolute bottom-40 right-10 w-24 h-24 text-secondary opacity-10 transform rotate-12" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">
                  Investimento em Memórias
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 text-balance">
                  Nossos Planos
                </h1>
                <p className="text-xl text-muted-foreground font-medium text-balance">
                  Transforme sua próxima viagem em um tesouro de família. Um preço único para memórias que duram para sempre.
                </p>
              </motion.div>
            </div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-lg mx-auto"
            >
              <div className="relative bg-card rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-4 border-primary/10 overflow-hidden group hover:border-primary/30 transition-colors duration-500">
                {/* Card Background Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform duration-500 group-hover:scale-110" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Guia Personalizado</h2>
                      <p className="text-muted-foreground font-medium">Crie seu guia personalizado para a família</p>
                    </div>
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 transform rotate-3">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <div className="mb-8 flex items-baseline text-foreground">
                    <span className="text-5xl font-extrabold tracking-tight">€29,99</span>
                    <span className="text-xl text-muted-foreground ml-2 font-medium">/ guia</span>
                  </div>

                  <div className="space-y-5 mb-10">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-secondary" />
                        </div>
                        <span className="text-foreground/90 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="w-full rounded-full text-lg py-7 bg-primary hover:bg-primary/90 text-white shadow-[0_8px_30px_rgb(232,122,93,0.3)] hover:shadow-[0_8px_40px_rgb(232,122,93,0.4)] transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <Link to="/create">
                      Começar a Criar Seu Guia
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Pagamento Seguro</h3>
                <p className="text-sm text-muted-foreground">Transação 100% protegida e criptografada.</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-foreground">Qualidade Premium</h3>
                <p className="text-sm text-muted-foreground">Design exclusivo e ilustrações encantadoras.</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground">Feito com Amor</h3>
                <p className="text-sm text-muted-foreground">Cada detalhe pensado para a sua família.</p>
              </div>
            </motion.div>

          </div>
        </main>

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

export default PricingPage;
