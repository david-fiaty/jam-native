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
import TabsView from '../view/TabsView';
import StaticData from '@/constants/StaticData';
import TextView from '../view/TextView';

const resource: string = 'password';

const ChangePasswordForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const formData = useSelector((state: any) => state.form[resource]);
  const [currentTab, setCurrentTab] = useState<any>(null);

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
      <TabsView 
        tabs={StaticData.authTabs} 
        currentTab={currentTab} 
        onItemPress={(tabId: string) => setCurrentTab(tabId)}
      />

      <TextView>{i18n.t('Old password')}</TextView>
      <InputTextField 
        placeholder={i18n.t('Your old password')} 
        onChangeText={(value: string) => FormManager.updateField(resource, "old_password", value, ['string'])}
      />
      {FormManager.renderError('old_password')}

      <TextView>{i18n.t('New password')}</TextView>
      <InputTextField 
        placeholder={i18n.t('Your new password')} 
        onChangeText={(value: string) => FormManager.updateField(resource, "new_password", value, ['string'])}
      />
      {FormManager.renderError('new_password')}

      <TextView>{i18n.t('Confirm password')}</TextView>
      <InputTextField 
        placeholder={i18n.t('Confirm your new password')} 
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

export default ChangePasswordForm;