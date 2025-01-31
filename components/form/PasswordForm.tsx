import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import InputTextField from '../field/InputTextField';
import ButtonView from '../view/ButtonView';
import DividerView from '../view/DividerView';
import UserManager from '@/manager/UserManager';
import ScreenManager from '@/manager/ScreenManager';

const PasswordForm = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({});

  const submitForm = async () => {
    // Todo - Implement password confirmation
    setIsProcessing(true);
    let result: any = await UserManager.changePassword(formData);
    let message: any = {
      title: i18n.t('Change password'),
      content: i18n.t('The password was successfully updated.'),
    };

    if (result?.error) message.content = i18n.t(result.error)
    else updateField(null, null)

    ScreenManager.showMessage(message);
    setIsProcessing(false);
  
    setIsProcessing(false);
  }  

  const updateField = (key?: any, value?: any) => {
    setFormData({
      ...formData,
      ...{ [key]: value },
    });
  };

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Change password')}
        onPress={() => ScreenManager.popScreen(router)}
      />
      
      <InputTextField 
        placeholder={i18n.t('Old password')} 
        onChangeText={(value: string) => updateField("old_password", value)}
      />

      <DividerView theme="secondary" />
      <InputTextField 
        placeholder={i18n.t('New password')} 
        onChangeText={(value: string) => updateField("new_password", value)}
      />

      <InputTextField 
        placeholder={i18n.t('Confirm new password')} 
      />

      <DividerView />
      <ButtonView 
        label={i18n.t('Save')} 
        isProcessing={isProcessing} 
        onPress={submitForm} 
      />
    </BoxView>
  );
};

export default PasswordForm;