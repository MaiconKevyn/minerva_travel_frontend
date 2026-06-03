
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-primary/5 border-y border-primary/10">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.02\'/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary mb-6 shadow-inner">
            <BookOpen className="w-10 h-10" />
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground leading-tight text-balance">
            Toda viagem merece ser contada como uma <span className="text-primary">linda história</span>
          </h2>

          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Junte-se a centenas de famílias que já transformaram seus roteiros em memórias inesquecíveis. É grátis e leva apenas alguns minutos!
          </p>

          <div className="pt-6">
            <Button
              asChild
              size="lg"
              className="rounded-full text-xl px-12 py-8 bg-primary hover:bg-primary/90 text-white shadow-[0_8px_30px_rgb(232,122,93,0.3)] hover:shadow-[0_8px_40px_rgb(232,122,93,0.4)] transition-all duration-300 hover:-translate-y-1 group"
            >
              <Link to="/create">
                Começar a Criar Seu Guia
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCTA;
