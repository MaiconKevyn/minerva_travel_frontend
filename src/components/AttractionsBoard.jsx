
import React, { useState } from 'react';
import { MapPin, Check, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AttractionsBoard = ({ attractions, onConfirm, onEdit }) => {
  const [selectedIds, setSelectedIds] = useState(attractions.map(a => a.id)); // Default select all

  if (!attractions || attractions.length === 0) return null;

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleConfirm = () => {
    const selectedAttractions = attractions.filter(a => selectedIds.includes(a.id));
    onConfirm(selectedAttractions);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-border/50">
        <div>
          <h3 className="text-2xl font-serif font-bold mb-1 text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Sugestões Mágicas
          </h3>
          <p className="text-muted-foreground font-medium">
            Encontramos {attractions.length} lugares incríveis. Selecione os que deseja visitar!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onEdit}
            className="rounded-full font-bold border-2 hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Editar Roteiro
          </Button>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
            {selectedIds.length} selecionadas
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map(attraction => {
          const isSelected = selectedIds.includes(attraction.id);
          return (
            <div
              key={attraction.id}
              onClick={() => toggleSelection(attraction.id)}
              className={`relative cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 ${
                isSelected
                  ? 'ring-4 ring-primary shadow-xl scale-[1.02]'
                  : 'shadow-md hover:shadow-xl hover:-translate-y-1 border border-border/50'
              } bg-white flex flex-col h-full group`}
            >
              <div className="h-56 overflow-hidden relative shrink-0">
                <img
                  src={attraction.imageUrl}
                  alt={attraction.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>

                <div className="absolute top-4 right-4 z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                    isSelected ? 'bg-primary text-white scale-110' : 'bg-white/90 text-muted-foreground hover:bg-white'
                  }`}>
                    <Check className={`w-5 h-5 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="inline-block px-3 py-1 mb-2 bg-white/95 backdrop-blur-sm text-xs font-bold uppercase tracking-wider rounded-full text-secondary shadow-sm">
                    {attraction.category}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white leading-tight text-balance">
                    {attraction.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 bg-white">
                <div className="flex items-center gap-1.5 text-primary text-sm mb-3 font-bold">
                  <MapPin className="w-4 h-4" />
                  {attraction.city}, {attraction.country}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium line-clamp-3 mt-auto">
                  {attraction.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-8">
        <Button
          onClick={handleConfirm}
          disabled={selectedIds.length === 0}
          className="rounded-full px-10 py-8 bg-secondary hover:bg-secondary/90 text-white font-bold text-xl shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
        >
          Confirmar Pontos Turísticos
        </Button>
      </div>
    </div>
  );
};

export default AttractionsBoard;
