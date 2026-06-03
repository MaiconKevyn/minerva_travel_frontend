
import React from 'react';
import { MapPin, Check } from 'lucide-react';

const AttractionsGrid = ({ attractions, selectedIds, onSelectionChange }) => {
  if (!attractions || attractions.length === 0) return null;

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
            } bg-white flex flex-col h-full`}
          >
            <div className="h-48 overflow-hidden relative shrink-0">
              <img
                src={attraction.imageUrl}
                alt={attraction.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

              <div className="absolute top-4 right-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                  isSelected ? 'bg-primary text-white scale-110' : 'bg-white/90 text-muted-foreground hover:bg-white'
                }`}>
                  <Check className={`w-5 h-5 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </div>

              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-xs font-bold uppercase tracking-wider rounded-full text-secondary shadow-sm">
                  {attraction.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-serif font-bold mb-2 text-foreground leading-tight">{attraction.name}</h3>
              <div className="flex items-center gap-1.5 text-primary text-sm mb-4 font-bold">
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
  );
};

export default AttractionsGrid;
