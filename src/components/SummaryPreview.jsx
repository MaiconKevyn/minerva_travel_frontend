
import React from 'react';
import { MapPin, Users, Camera, Star } from 'lucide-react';

const SummaryPreview = ({ formData }) => {
  const { photo, familyName, children, confirmedAttractions } = formData;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold mb-2">O Livro de Aventuras</h2>
        <p className="text-muted-foreground font-medium">Um resumo da sua próxima história</p>
      </div>

      <div className="bg-[#FDFBF7] rounded-3xl p-6 md:p-8 border-2 border-border/50 shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Capa */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-primary">
              <Camera className="w-5 h-5" /> A Capa
            </h3>
            {photo ? (
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <img src={URL.createObjectURL(photo)} alt="Capa do Guia" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-2xl bg-muted flex items-center justify-center border-2 border-dashed border-border">
                <p className="text-muted-foreground font-medium">Nenhuma foto selecionada</p>
              </div>
            )}
          </div>

          {/* Detalhes */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-secondary mb-3">
                <Users className="w-5 h-5" /> Os Protagonistas
              </h3>
              <p className="font-medium text-lg">Família {familyName || '...'}</p>
              {children && children.length > 0 && (
                <p className="text-muted-foreground">Com os pequenos aventureiros: {children.join(', ')}</p>
              )}
            </div>

            {confirmedAttractions && confirmedAttractions.length > 0 ? (
              <div>
                <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-primary mb-3">
                  <Star className="w-5 h-5" /> O Roteiro Mágico
                </h3>
                <ul className="space-y-3">
                  {confirmedAttractions.map((attr, idx) => (
                    <li key={idx} className="font-medium text-sm flex items-start gap-3 bg-white p-3 rounded-xl border border-border/50 shadow-sm">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <img src={attr.imageUrl} alt={attr.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <strong className="text-foreground block text-base">{attr.name}</strong>
                        <span className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {attr.city}, {attr.country}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-primary mb-3">
                  <Star className="w-5 h-5" /> O Roteiro Mágico
                </h3>
                <p className="text-muted-foreground">Nenhuma atração confirmada ainda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPreview;
