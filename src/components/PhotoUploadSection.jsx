
import React, { useState, useRef } from 'react';
import { Upload, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WarmCard from './WarmCard.jsx';
import { Flower } from './DecorativeElements.jsx';

const PhotoUploadSection = ({ photo, onPhotoChange, error }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onPhotoChange(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      onPhotoChange(files[0]);
    }
  };

  const handleRemove = () => {
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const photoUrl = photo ? URL.createObjectURL(photo) : null;

  return (
    <WarmCard className="border-t-4 border-t-primary relative">
      <Flower className="absolute -top-6 -right-6 w-16 h-16 text-accent opacity-20 rotate-45" />

      <div className="mb-6">
        <h3 className="text-3xl font-serif font-bold mb-2">A Foto da Família</h3>
        <p className="text-muted-foreground text-lg">Escolha uma foto especial para a capa do seu guia.</p>
      </div>

      {!photo ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-4 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
            isDragging
              ? 'border-primary bg-primary/5 scale-[1.02]'
              : 'border-muted-foreground/20 hover:border-primary/40 bg-muted/30 hover:bg-muted/50'
          }`}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
              <Camera className="w-10 h-10" />
            </div>
            <div>
              <p className="text-xl font-medium mb-2 font-serif">Arraste sua foto para cá</p>
              <p className="text-muted-foreground mb-6">
                ou clique para procurar (JPEG, PNG - máx 5MB)
              </p>
              <Button
                type="button"
                size="lg"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full px-8 bg-secondary hover:bg-secondary/90 text-white shadow-md transition-all duration-200 active:scale-95"
              >
                Escolher Arquivo
              </Button>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden bg-muted border-4 border-white shadow-md p-2">
          <img
            src={photoUrl}
            alt="Foto da família selecionada"
            className="w-full h-80 object-cover rounded-2xl"
          />
          <div className="absolute top-6 right-6 flex gap-3">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full shadow-lg bg-white/90 hover:bg-white text-foreground hover:scale-105 transition-all duration-200"
            >
              <Camera className="w-5 h-5" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="destructive"
              onClick={handleRemove}
              className="rounded-full shadow-lg hover:scale-105 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm font-medium text-destructive bg-destructive/10 py-2 px-4 rounded-xl inline-block">
          {error}
        </p>
      )}
    </WarmCard>
  );
};

export default PhotoUploadSection;
