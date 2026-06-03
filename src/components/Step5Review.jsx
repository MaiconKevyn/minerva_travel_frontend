
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Camera, Sparkles, Star, Loader2, Navigation, Download } from 'lucide-react';
import { useConversationalGuide } from '@/contexts/ConversationalGuideContext.jsx';
import { Button } from '@/components/ui/button';
import { generatePDF } from '@/utils/minerva-api.js';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const Step5Review = () => {
  const {
    familyName,
    coverPhoto,
    coverPhotoUrl,
    destination,
    parsedData,
    selectedLandmarks,
    childrenList,
    parentsList,
    recommendedItinerary,
    year
  } = useConversationalGuide();

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  // Derive the rich data from the IDs
  const finalLandmarks = selectedLandmarks.map(id =>
    parsedData.landmarks.find(l => l.id === id)
  ).filter(Boolean);
  const childrenNames = childrenList.join(', ');
  const parentsNames = parentsList.join(', ');
  const recommendedDays = (recommendedItinerary?.days || [])
    .map((day) => ({
      ...day,
      landmarks: finalLandmarks.filter((landmark) => landmark.itinerary_day === day.day),
    }))
    .filter((day) => day.landmarks.length > 0);
  const extraLandmarks = finalLandmarks.filter((landmark) => !landmark.itinerary_day);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const guideData = {
        title: `Família ${familyName}`,
        childrenNames,
        parentsNames,
        year,
        familyPhoto: coverPhoto, // Pass the actual File object
        landmarks: finalLandmarks,
        selectedLandmarks
      };

      const result = await generatePDF(guideData);

      if (result.download_url) {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://minerva-travel.onrender.com';
        setPdfUrl(`${baseUrl}${result.download_url}`);
        setIsSuccess(true);
        toast.success('Guia de viagem gerado com sucesso!');

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f1613b', '#489cc8', '#69b482', '#fdfbf7']
        });
      } else {
        throw new Error('URL de download não encontrada na resposta.');
      }

    } catch (error) {
      console.error(error);
      toast.error('Não foi possível gerar o PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto text-center space-y-8 py-20"
      >
        <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-accent">
          <Sparkles className="w-12 h-12" />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          Guia Gerado com Sucesso!
        </h2>
        <p className="text-xl text-muted-foreground font-medium">
          O Livro de Aventuras da Família {familyName} está pronto para ser vivido!
        </p>
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.open(pdfUrl, '_blank')}
            className="rounded-full px-10 py-6 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg hover:-translate-y-1 transition-all"
          >
            <Download className="w-5 h-5 mr-2" /> Download PDF
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="rounded-full px-10 py-6 font-bold text-lg hover:-translate-y-1 transition-all"
          >
            Voltar ao Início
          </Button>
        </div>
      </motion.div>
    );
  }

  // Group final landmarks by destination id
  const groupedLandmarks = finalLandmarks.reduce((acc, landmark) => {
    if (!acc[landmark.destination_id]) {
      acc[landmark.destination_id] = [];
    }
    acc[landmark.destination_id].push(landmark);
    return acc;
  }, {});

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          Perfeito! Aqui está o resumo do seu roteiro
        </h2>
        <p className="text-lg text-muted-foreground font-medium">Revise as informações antes de gerarmos o PDF oficial.</p>
      </div>

      <div className="bg-card dark:bg-slate-800 rounded-[40px] p-8 md:p-12 shadow-storybook border-2 border-border/50 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-primary">
              <Camera className="w-5 h-5" /> A Capa
            </h3>
            {coverPhotoUrl ? (
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
                <img src={coverPhotoUrl} alt="Capa do Guia" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-3xl bg-muted flex items-center justify-center border-2 border-dashed border-border">
                <p className="text-muted-foreground font-medium">Sem foto de capa</p>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-secondary mb-3">
                <Users className="w-5 h-5" /> Protagonistas
              </h3>
              <p className="font-medium text-lg text-foreground">Família {familyName}</p>
              {(childrenNames || parentsNames) && (
                <div className="mt-2 text-sm text-muted-foreground space-y-1">
                  {parentsNames && <p>Pais: {parentsNames}</p>}
                  {childrenNames && <p>Crianças: {childrenNames}</p>}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-accent mb-3">
                <MapPin className="w-5 h-5" /> Resumo do Destino
              </h3>
              <p className="font-medium text-base text-muted-foreground line-clamp-3 italic">"{destination}"</p>
              <p className="text-sm text-muted-foreground mt-2">Ano: {year}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <h3 className="text-2xl font-serif font-bold flex items-center gap-2 text-primary mb-8">
            <Star className="w-6 h-6" /> O Roteiro Mágico ({finalLandmarks.length} locais selecionados)
          </h3>

          <div className="space-y-8">
            {recommendedDays.length > 0 ? recommendedDays.map(day => (
              <div key={day.day} className="bg-background rounded-3xl p-6 border border-border/60">
                <h4 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-secondary" />
                  {day.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">{day.theme}</p>
                <ul className="space-y-4">
                  {day.landmarks.map(landmark => (
                    <li key={landmark.id} className="flex flex-col border-l-2 border-accent/30 pl-4 py-1">
                      <strong className="text-foreground font-bold">{landmark.name}</strong>
                      <span className="text-muted-foreground text-sm leading-relaxed mt-1 line-clamp-2">
                        {landmark.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )) : Object.keys(groupedLandmarks).map(destId => {
              const destObj = parsedData.destinations.find(d => d.id === destId);
              const items = groupedLandmarks[destId];
              if (!destObj) return null;

              return (
                <div key={destId} className="bg-background rounded-3xl p-6 border border-border/60">
                  <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-secondary" />
                    {destObj.city}, {destObj.country}
                  </h4>
                  <ul className="space-y-4">
                    {items.map(landmark => (
                      <li key={landmark.id} className="flex flex-col border-l-2 border-accent/30 pl-4 py-1">
                        <strong className="text-foreground font-bold">{landmark.name}</strong>
                        <span className="text-muted-foreground text-sm leading-relaxed mt-1 line-clamp-2">
                          {landmark.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            {recommendedDays.length > 0 && extraLandmarks.length > 0 && (
              <div className="bg-background rounded-3xl p-6 border border-border/60">
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-secondary" />
                  Outras escolhas
                </h4>
                <ul className="space-y-4">
                  {extraLandmarks.map(landmark => (
                    <li key={landmark.id} className="flex flex-col border-l-2 border-accent/30 pl-4 py-1">
                      <strong className="text-foreground font-bold">{landmark.name}</strong>
                      <span className="text-muted-foreground text-sm leading-relaxed mt-1 line-clamp-2">
                        {landmark.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="rounded-full px-12 py-8 bg-primary hover:bg-primary/90 text-white font-bold text-xl shadow-[0_8px_30px_rgb(241,97,59,0.3)] hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isGenerating ? (
            <><Loader2 className="w-6 h-6 animate-spin mr-3 inline-block" /> Criando a Magia...</>
          ) : (
            <><Sparkles className="w-6 h-6 mr-3 inline-block" /> Gerar PDF do Guia</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Step5Review;
