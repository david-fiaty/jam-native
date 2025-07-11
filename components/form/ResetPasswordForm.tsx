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
import ScreenManager from '@/manager/ScreenManager';
import InputPasswordField from '../field/InputPasswordField';

const resource: string = 'password';

const ResetPasswordForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const formData = useSelector((state: any) => state.form[resource]);

  const submitForm = async () => {
    setIsProcessing(true);

    let message: any = {
      title: i18n.t('Change password'),
      content: i18n.t('Password successfully updated.'),
    };

    let result: any = await UserManager.changePassword(formData);

    if (result.success === false) {
      message.content = i18n.t('Invalid data submission.');
      FormManager.addServerErrors(resource, result.response);
    }
 
    ScreenManager.showMessage(message);
    setIsProcessing(false);
  };

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.formContainer}>
      <InputPasswordField
        placeholder={i18n.t('Old password')} 
        onChangeText={(value: string) => FormManager.updateField(resource, "old_password", value, ['string'])}
      />
      {FormManager.renderError('old_password')}

      <DividerView theme="secondary" />
      <InputPasswordField 
        placeholder={i18n.t('New password')} 
        onChangeText={(value: string) => FormManager.updateField(resource, "new_password", value, ['string'])}
      />
      {FormManager.renderError('new_password')}

      <InputPasswordField
        placeholder={i18n.t('Confirm new password')} 
        onChangeText={(value: string) => FormManager.updateField(resource, "confirm_password", value, ['string'])}
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

export default ResetPasswordForm;