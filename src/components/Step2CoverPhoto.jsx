
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, UploadCloud, CheckCircle2 } from 'lucide-react';
import { useConversationalGuide } from '@/contexts/ConversationalGuideContext.jsx';
import { Button } from '@/components/ui/button';

const Step2CoverPhoto = () => {
  const { coverPhoto, coverPhotoUrl, updateCoverPhoto, nextStep } = useConversationalGuide();
  const [isDragging, setIsDragging] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      updateCoverPhoto(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      updateCoverPhoto(e.target.files[0]);
    }
  };

  const handleConfirm = () => {
    if (!coverPhoto) return;
    setIsConfirmed(true);
  };

  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        nextStep();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, nextStep]);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
      <AnimatePresence mode="wait">
        {!isConfirmed ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground leading-tight">
              Agora, adicione uma foto para a capa do guia
            </h2>
            <p className="text-lg text-muted-foreground">Pode ser uma foto da família ou do último destino de vocês!</p>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer overflow-hidden rounded-3xl border-4 border-dashed transition-all duration-300 aspect-[16/9] md:aspect-[21/9] flex flex-col items-center justify-center group ${
                isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border/60 hover:border-primary/50 hover:bg-muted/30'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {coverPhotoUrl ? (
                <>
                  <img src={coverPhotoUrl} alt="Capa" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold text-lg">Trocar Foto</p>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                    <UploadCloud className="w-10 h-10" />
                  </div>
                  <p className="font-bold text-xl text-foreground mb-2">Clique ou arraste uma foto aqui</p>
                  <p className="text-muted-foreground">PNG, JPG ou WEBP até 10MB</p>
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: coverPhoto ? 1 : 0 }}
              className="flex justify-center"
            >
              <Button
                onClick={handleConfirm}
                disabled={!coverPhoto}
                className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg hover:-translate-y-1 transition-all"
              >
                Ficou Ótimo! <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="relative w-32 h-32 mx-auto">
              <img src={coverPhotoUrl} alt="Capa confirmada" className="w-full h-full object-cover rounded-full shadow-xl" />
              <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Que foto linda!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Step2CoverPhoto;
