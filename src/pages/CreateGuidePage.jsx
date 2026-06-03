
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import { useConversationalGuide } from '@/contexts/ConversationalGuideContext.jsx';
import Step1FamilyName from '@/components/Step1FamilyName.jsx';
import Step2CoverPhoto from '@/components/Step2CoverPhoto.jsx';
import Step3Destination from '@/components/Step3Destination.jsx';
import Step4Attractions from '@/components/Step4Attractions.jsx';
import EnhancedStep5FamilyDetails from '@/components/EnhancedStep5FamilyDetails.jsx';
import Step5Review from '@/components/Step5Review.jsx';
import { Button } from '@/components/ui/button';

const CreateGuidePageContent = () => {
  const { currentStep, goBack } = useConversationalGuide();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1FamilyName />;
      case 2: return <Step2CoverPhoto />;
      case 3: return <Step3Destination />;
      case 4: return <Step4Attractions />;
      case 5: return <EnhancedStep5FamilyDetails />;
      case 6: return <Step5Review />;
      default: return <Step1FamilyName />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Criar Guia - Aventuras em Família</title>
        <meta name="description" content="Crie seu guia de viagem conversando com nosso assistente." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col transition-colors duration-200">
        <Header />

        <main className="flex-1 flex flex-col relative py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

          {/* Top Bar with Progress and Back Button */}
          <div className="flex items-center justify-between mb-8 md:mb-16">
            <div className="w-24">
              {currentStep > 1 && currentStep < 7 && (
                <Button
                  variant="ghost"
                  onClick={goBack}
                  className="rounded-full font-bold text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Voltar
                </Button>
              )}
            </div>

            <div className="flex-1 max-w-xs mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5, 6].map((s) => (
                  <div
                    key={s}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      s === currentStep ? 'w-8 bg-primary' : s < currentStep ? 'w-4 bg-primary/40' : 'w-4 bg-border'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Passo {currentStep} de 6
              </p>
            </div>

            <div className="w-24" /> {/* Spacer to balance flex-between */}
          </div>

          {/* Form Area */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
};

export default CreateGuidePageContent;
