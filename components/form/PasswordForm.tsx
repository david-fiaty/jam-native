import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import InputTextField from '../field/InputTextField';
import SpinnerView from '../view/SpinnerView';
import { Divider } from '@rneui/base';

const PasswordForm = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), Layout.animation.duration);
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Change password')}
        onPress={() => router.back()}
      />
      
      <InputTextField placeholder={i18n.t('Old password')} />
      <InputTextField placeholder={i18n.t('New password')} />
      <InputTextField placeholder={i18n.t('Confirm new password')} />
    </BoxView>
  );
};

export default PasswordForm;