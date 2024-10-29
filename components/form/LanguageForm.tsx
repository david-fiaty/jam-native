import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import InputTextField from '../field/InputTextField';
import SpinnerView from '../view/SpinnerView';
import SelectListBase from '../base/SelectListBase';

const data = [
  {
    label: i18n.t('French'),
    value: 'fr',
  },
  {
    label: i18n.t('English'),
    value: 'en',
  },
];

const LanguageForm = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), Layout.animation.duration);
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Language')}
        onPress={() => router.back()}
      />
      <SelectListBase data={data} placeholder={i18n.t('English')} />
    </BoxView>
  );
};

export default LanguageForm;