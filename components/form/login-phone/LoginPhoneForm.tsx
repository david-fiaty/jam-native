import React, { useState, useEffect } from "react";
import { View } from 'react-native';
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import ButtonView from '@/components/view/ButtonView';
import UserManager from "@/manager/UserManager";
import FormManager from "@/manager/FormManager";
import SpinnerView from "@/components/view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import InputPasswordField from "@/components/field/InputPasswordField";
import InputPhoneField from "@/components/field/InputPhoneField";
import ContentManager from "@/manager/ContentManager";

const resource: string = 'login';

const LoginPhoneForm = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);
  const countryList: any[] = ContentManager.getCountryPhoneCodes();

  const submitData = async () => {
    setIsProcessing(true);
    
    let payload: any = {
      country_code: (countryList.find((o: any) => o.code === formData?.country))?.prefix,
      phone_without_country_code: formData?.phone,
      phone_service: formData?.phone_service,
    };

    let result: any = await UserManager.sendSignupCode(payload);
  
    if (result.success === false) {
      FormManager.addServerErrors(resource, { phone: [i18n.t('Invalid phone number provided.')] });

      ScreenManager.showMessage({
        title: i18n.t('Signup error'),
        content: i18n.t('Invalid data submitted.'),
      });
    }
    else {
      FormManager.updateField(resource, 'session', result.response.session);
    }

    setIsProcessing(false);
  };

  const isSubmitButtonDisabled = () => {
    return !formData?.email?.length;
  };

  const isEmailFieldDisabled = () => {
    return formData?.email?.length && formData?.session?.length;
  };

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  }, [isLoaded, resource]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={Layout.formContainer}>
      
      <InputPhoneField
        resource={resource}
        phoneNumberFieldKey="phone_without_country_code"
        phonePrefixFieldKey="country_code"
        phoneNumberFieldValue={formData?.phone_without_country_code || ''}
        phonePrefixFieldValue={formData?.country_code || ''}
        rules={['required', 'phone']}
        inputlabel={i18n.t('Phone number')}
        selectLabel={i18n.t('Country')}
        inputPlaceholder={i18n.t('Enter your phone number')}
        selectPlaceholder={i18n.t('Select your country')}
        theme="white"
        inline={true}
      />

      <InputPasswordField
        resource={resource}
        fieldKey="password"
        rules={['required', 'string']}
        label={i18n.t('Password')}
        placeholder={i18n.t('Enter your password')}
        theme="white"
      />

      {!isEmailFieldDisabled() && (
        <ButtonView
          label={i18n.t('Continue')}
          isProcessing={isProcessing}
          onPress={submitData}
          //disabled={isSubmitButtonDisabled()}
        />
      )}
    </View>
  );
}

export default LoginPhoneForm;