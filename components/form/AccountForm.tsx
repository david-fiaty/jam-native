import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import InputTextField from '../field/InputTextField';
import SpinnerView from '../view/SpinnerView';
import ButtonView from '../view/ButtonView';
import DividerView from '../view/DividerView';
import UserManager from '@/manager/UserManager';

const AccountForm = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const submitForm = async () => {
    
    
  }  

  useEffect(() => {
    (async () => {
    if (!isLoaded) {
      setFormData(await UserManager.getUserData());
      setIsLoaded(true);
    } 
    })();
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  console.log(formData);

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Account information')}
        onPress={() => router.back()}
      />
    
      <InputTextField 
        placeholder={i18n.t('User name')} 
        value={formData?.username}
      />
      <InputTextField 
        placeholder={i18n.t('Email address')} 
        value={formData?.email}  
      />
      <InputTextField 
        placeholder={i18n.t('Phone number')} 
        value={formData?.phone}
      />

    <DividerView />
    <ButtonView 
      label={i18n.t('Save')} 
      isProcessing={isProcessing} 
      onPress={() => {
        setIsProcessing(true);
        submitForm();
      }} 
    />

    </BoxView>
  );
};

export default AccountForm;