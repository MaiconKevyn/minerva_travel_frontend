
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const FeatureCard = ({ icon: Icon, title, description, colorClass, bgClass, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="border-border/50 dark:border-slate-700 bg-background hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 overflow-hidden group">
        <CardContent className="p-5 sm:p-6 flex items-start gap-4 sm:gap-5">
          <div className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${bgClass} flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${colorClass}`} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground mb-1.5">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
