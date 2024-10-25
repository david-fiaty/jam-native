import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import InputTextBase from '../base/InputTextBase';
import SpinnerView from '../view/SpinnerView';

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
      <BoxView direction="column" align="flex-start" justify="flex-start" style={Layout.screenContent}>
        <InputTextBase placeholder={i18n.t('Full name')} />
        <InputTextBase placeholder={i18n.t('Email address')} />
        <InputTextBase placeholder={i18n.t('Phone number')} />
      </BoxView>
    </BoxView>
  );
};

export default LanguageForm;