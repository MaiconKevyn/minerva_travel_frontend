
import React from 'react';
import { cn } from '@/lib/utils';
import { Camera, MapPin } from 'lucide-react';
import { Flower, Airplane } from '@/components/DecorativeElements.jsx';

const BookCover = ({
  destination = 'Europa',
  familyName = 'Família Exploradora',
  childrenNames = '',
  year = new Date().getFullYear(),
  coverPhoto = null,
  className
}) => {
  return (
    <div className={cn("perspective-1000 w-full max-w-[420px] mx-auto group", className)}>
      <div className="relative w-full aspect-[3/4] preserve-3d book-tilt shadow-2xl rounded-r-3xl rounded-l-lg cursor-pointer">

        {/* Book Spine (Left Side 3D) */}
        <div className="book-spine z-0 border-l border-y border-primary/20">
          <span className="writing-vertical rotate-180 text-primary-foreground/90 font-serif font-bold tracking-widest text-sm whitespace-nowrap">
            GUIA DE VIAGEM • {year}
          </span>
        </div>

        {/* Book Pages Edge (Right Side 3D) */}
        <div className="book-pages-edge z-0"></div>

        {/* Front Cover */}
        <div className="absolute inset-0 bg-[#FDFBF7] dark:bg-slate-800 rounded-r-3xl rounded-l-md border border-border/40 overflow-hidden z-10 flex flex-col transform translate-z-[1px]">

          {/* Decorative Spine Shadow on Front */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black/10 to-transparent mix-blend-multiply z-20 pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/60 z-20 pointer-events-none" />

          {/* Background Textures / Illustrations */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E')]"></div>

          {/* Landmarks & Decorative Elements */}
          <MapPin className="absolute top-12 right-8 w-16 h-16 text-primary/10 -rotate-12" />
          <Airplane className="absolute top-1/4 -left-4 w-20 h-20 text-secondary opacity-20 -rotate-12" />
          <Flower className="absolute -bottom-6 -left-6 w-32 h-32 text-accent opacity-20 -rotate-45" />
          <Flower className="absolute top-1/2 -right-8 w-24 h-24 text-primary opacity-10 rotate-45" />

          {/* Header Section */}
          <div className="pt-12 px-8 text-center relative z-10">
            <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3">
              Pequenos Exploradores pela
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight text-balance">
              {destination}
            </h2>
            <p className="mt-4 text-sm font-medium text-muted-foreground italic">
              com a Mamãe e o Papai
            </p>
          </div>

          {/* Photo Section */}
          <div className="flex-1 flex items-center justify-center px-10 relative z-10 my-4">
            <div className="w-full aspect-square rounded-full border-[6px] border-white dark:border-slate-700 shadow-xl overflow-hidden bg-muted relative transform group-hover:scale-105 transition-transform duration-500">
              {coverPhoto ? (
                <img
                  src={typeof coverPhoto === 'string' ? coverPhoto : URL.createObjectURL(coverPhoto)}
                  alt={`Aventuras da ${familyName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/10 text-secondary">
                  <Camera className="w-12 h-12 opacity-50 mb-2" />
                  <span className="text-xs font-bold opacity-60 uppercase tracking-wider">Foto da Família</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Section */}
          <div className="pb-10 px-8 text-center relative z-10">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-1">
              {familyName}
            </h3>
            {childrenNames && (
              <p className="text-sm font-medium text-muted-foreground mb-3">
                & {childrenNames}
              </p>
            )}
            <div className="w-16 h-1 bg-primary/30 mx-auto rounded-full my-4" />
            <p className="text-xs font-bold tracking-widest text-foreground/40 uppercase">
              Edição de {year}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookCover;
