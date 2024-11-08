import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSelector } from "react-redux";
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import InputTextField from '../field/InputTextField';
import SpinnerView from '../view/SpinnerView';
import ButtonView from '../view/ButtonView';
import DividerView from '../view/DividerView';

const AccountForm = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const userState = useSelector((state: any) => state.user);
  const [isProcessing, setIsProcessing] = useState(false);

  const accountData = JSON.parse(userState.accountData);

  const submitForm = async () => {
    setTimeout(() => setIsProcessing(false), 3000);
  }  

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), Layout.animation.duration);
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Account information')}
        onPress={() => router.back()}
      />
    
      <InputTextField 
        placeholder={i18n.t('User name')} 
        value={accountData?.username}
      />
      <InputTextField 
        placeholder={i18n.t('Email address')} 
        value={accountData?.email}  
      />
      <InputTextField 
        placeholder={i18n.t('Phone number')} 
        value={accountData?.phone}
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