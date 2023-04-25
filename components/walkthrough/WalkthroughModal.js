import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FlipoModal from '../FlipoModal';
import FlipoText from '../FlipoText';

// Translations
import * as locales from "../../localizations/localizationWalkthrough";

const WalkthroughModal = ({ i18n, visible, storeShowWalkthrough }) => {
  i18n.translations = locales;

  const steps = [
    (
      <View className='space-y-4'>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('welcomeContent01')}
        </FlipoText>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('welcomeContent02')}
        </FlipoText>
      </View>
    ),
    (
      <View className='space-y-4'>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('sectionsContent01')}
        </FlipoText>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('sectionsContent02')}
        </FlipoText>
      </View>
    ),
    (
      <View className='space-y-4'>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('decksSectionContent01')}
        </FlipoText>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('decksSectionContent02')}
        </FlipoText>
      </View>
    ),
    (
      <View className='space-y-4'>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('profileSectionContent01')}
        </FlipoText>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('profileSectionContent02')}
        </FlipoText>
      </View>
    ),
    (
      <View className='space-y-4'>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('settingsSectionContent01')}
        </FlipoText>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('settingsSectionContent02')}
        </FlipoText>
      </View>
    ),
    (
      <View className='space-y-4'>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('deckCreationContent01')}
        </FlipoText>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('deckCreationContent02')}
        </FlipoText>
      </View>
    ),
    (
      <View className='space-y-4'>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('deckPlaythroughContent01')}
        </FlipoText>
      </View>
    ),
    (
      <View className='space-y-4'>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('deckPlaythroughContent02')}
        </FlipoText>
        <FlipoText
          className="text-lg text-center text-primary-light dark:text-primary-dark"
        >
          {i18n.t('deckPlaythroughContent03')}
        </FlipoText>
      </View>
    )
  ];
  const stepTitles = [
    'welcomeTitle',
    'sectionsTitle',
    'decksSectionTitle',
    'profileSectionTitle',
    'settingsSectionTitle',
    'deckCreationTitle',
    'deckPlaythroughTitle',
    'deckPlaythroughTitle'
  ];

  const [currentTitle, setCurrentTitle] = useState(stepTitles[0]);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [currentStepNumber, setCurrentStepNumber] = useState(1);
  const [open, setOpen] = useState(visible);

  useEffect(() => {
    console.log('Walkthrough started.')
    setOpen(visible);
    setCurrentStepNumber(1);
    setCurrentTitle(stepTitles[0]);
    setCurrentStep(steps[0]);
  }, [visible])


  return (
    <FlipoModal
      title={i18n.t(currentTitle)}
      visible={open}
      buttonText={i18n.t('continue')}
      cancelButton cancelButtonText={i18n.t('skip')}
      onCancelPress={() => {
        storeShowWalkthrough(false);
        setOpen(false);
      }}
      onButtonPress={() => {
        setCurrentStepNumber((prevStepNumber) => (prevStepNumber + 1));
        if (currentStepNumber < steps.length) {
          setCurrentTitle(stepTitles[currentStepNumber]);
          setCurrentStep(steps[currentStepNumber]);
        } else {
          storeShowWalkthrough(false);
          setOpen(false);
        }
      }}
    >
      {currentStep}
    </FlipoModal>
  );
}

export default WalkthroughModal;