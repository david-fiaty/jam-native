import { useState } from 'react';
import { useSelector } from "react-redux";
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import InputTextField from '../field/InputTextField';
import ButtonView from '../view/ButtonView';
import DividerView from '../view/DividerView';
import UserManager from '@/manager/UserManager';
import FormManager from '@/manager/FormManager';

const resource: string = 'password';

const PasswordForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const formData = useSelector((state: any) => state.form[resource]);

  const submitForm = async () => {
    // Todo - Implement password confirmation
    setIsProcessing(true);
    let result: any = await UserManager.changePassword(formData);
    let message: any = {
      title: i18n.t('Change password'),
      content: i18n.t('The password was successfully updated.'),
    };

    if (result?.error) message.content = i18n.t(result.error)
  
    setIsProcessing(false);
  }  

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.formContainer}>
      <InputTextField 
        placeholder={i18n.t('Old password')} 
        onChangeText={(value: string) => FormManager.updateField(resource, "old_password", value)}
      />
      {FormManager.renderError('old_password')}

      <DividerView theme="secondary" />
      <InputTextField 
        placeholder={i18n.t('New password')} 
        onChangeText={(value: string) => FormManager.updateField(resource, "new_password", value)}
      />
      {FormManager.renderError('new_password')}

      <InputTextField 
        placeholder={i18n.t('Confirm new password')} 
        onChangeText={(value: string) => FormManager.updateField(resource, "confirm_password", value)}
      />
      {FormManager.renderError('confirm_password')}

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