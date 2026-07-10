import { useState } from 'react';
import { useSelector } from "react-redux";
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
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
        resource={resource}
        fieldKey="old_password"
        rules={['required', 'string']}
        value={formData?.old_password || ''}
        label={i18n.t('Old password')}
        placeholder={i18n.t('Your old password')}
      />

      <DividerView theme="secondary" />

      <InputPasswordField
        resource={resource}
        fieldKey="new_password"
        rules={['required', 'string']}
        value={formData?.new_password || ''}
        label={i18n.t('New password')}
        placeholder={i18n.t('Your new password')}
      />

      <InputPasswordField
        resource={resource}
        fieldKey="password_confirmation"
        rules={['required', 'string']}
        value={formData?.password_confirmation || ''}
        label={i18n.t('Confirmation')}
        placeholder={i18n.t('Password confirmation')}
        onChangeText={(value: string) => {
          FormManager.updateField(resource, 'password_confirmation', value, ['string']);
          FormManager.validatePasswordMatch(resource, 'password_confirmation', value, formData?.password);
        }}
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

export default ResetPasswordForm;