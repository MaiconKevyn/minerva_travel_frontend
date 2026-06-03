
import React from 'react';
import { Plus, X, MapPin, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import WarmCard from './WarmCard.jsx';
import { Suitcase } from './DecorativeElements.jsx';

const CountryAttractionSelector = ({ countries, onCountriesChange, error }) => {
  const addCountry = () => {
    onCountriesChange([...countries, { name: '', attractions: [''] }]);
  };

  const removeCountry = (countryIndex) => {
    const newCountries = countries.filter((_, i) => i !== countryIndex);
    onCountriesChange(newCountries);
  };

  const updateCountryName = (countryIndex, name) => {
    const newCountries = [...countries];
    newCountries[countryIndex].name = name;
    onCountriesChange(newCountries);
  };

  const addAttraction = (countryIndex) => {
    const newCountries = [...countries];
    newCountries[countryIndex].attractions.push('');
    onCountriesChange(newCountries);
  };

  const removeAttraction = (countryIndex, attractionIndex) => {
    const newCountries = [...countries];
    newCountries[countryIndex].attractions = newCountries[countryIndex].attractions.filter(
      (_, i) => i !== attractionIndex
    );
    onCountriesChange(newCountries);
  };

  const updateAttraction = (countryIndex, attractionIndex, value) => {
    const newCountries = [...countries];
    newCountries[countryIndex].attractions[attractionIndex] = value;
    onCountriesChange(newCountries);
  };

  return (
    <WarmCard className="border-t-4 border-t-accent relative">
      <Suitcase className="absolute -top-4 right-8 w-16 h-16 text-accent opacity-20 rotate-[-15deg]" />

      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="text-3xl font-serif font-bold mb-2 flex items-center gap-3">
            <MapIcon className="w-8 h-8 text-accent" />
            Destinos Mágicos
          </h3>
          <p className="text-muted-foreground text-lg">Para onde será a próxima grande viagem?</p>
        </div>
        <Button
          type="button"
          onClick={addCountry}
          className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm transition-all duration-200 active:scale-95"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Destino
        </Button>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {countries.map((country, countryIndex) => (
            <motion.div
              key={countryIndex}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-border space-y-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 space-y-6">
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="País ou Cidade (ex: Paris, França)"
                      value={country.name}
                      onChange={(e) => updateCountryName(countryIndex, e.target.value)}
                      className="flex-1 h-14 rounded-2xl text-lg bg-background border-border focus-visible:ring-accent"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => removeCountry(countryIndex)}
                      className="h-14 w-14 rounded-2xl hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="bg-muted/30 p-5 rounded-2xl space-y-4 border border-border/50">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">O que visitar</Label>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => addAttraction(countryIndex)}
                        className="rounded-full hover:bg-accent/10 hover:text-accent h-8 transition-colors"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Adicionar Local
                      </Button>
                    </div>

                    <AnimatePresence mode="popLayout">
                      {country.attractions.map((attraction, attractionIndex) => (
                        <motion.div
                          key={attractionIndex}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.15 }}
                          className="flex gap-2 items-center"
                        >
                          <div className="w-2 h-2 rounded-full bg-accent/50" />
                          <Input
                            type="text"
                            placeholder={`Ponto turístico (ex: Torre Eiffel)`}
                            value={attraction}
                            onChange={(e) => updateAttraction(countryIndex, attractionIndex, e.target.value)}
                            className="flex-1 h-10 bg-white rounded-xl border-border/50 focus-visible:ring-accent"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => removeAttraction(countryIndex, attractionIndex)}
                            className="w-10 h-10 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {country.attractions.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-3 italic">
                        Nenhum local adicionado.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {countries.length === 0 && (
          <div className="text-center py-16 bg-white/50 border-2 border-dashed border-border rounded-3xl">
            <MapIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-medium text-lg">Nenhum destino adicionado ainda.<br/>Clique no botão acima para começar!</p>
          </div>
        )}

        {error && (
          <p className="text-sm font-medium text-destructive bg-destructive/10 py-1.5 px-3 rounded-lg inline-block">
            {error}
          </p>
        )}
      </div>
    </WarmCard>
  );
};

export default CountryAttractionSelector;
