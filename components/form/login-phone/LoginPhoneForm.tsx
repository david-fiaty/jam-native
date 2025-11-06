import React, { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import InputTextField from '@/components/field/InputTextField';
import TextView from '@/components/view/TextView';
import ButtonView from '@/components/view/ButtonView';
import UserManager from "@/manager/UserManager";
import FormManager from "@/manager/FormManager";
import SpinnerView from "@/components/view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import CountryPhoneCodeField from "@/components/field/CountryPhoneCodeField";
import StaticData from "@/constants/StaticData";
import IconView from "@/components/view/IconView";
import InputPasswordField from "@/components/field/InputPasswordField";
import InputPhoneField from "@/components/field/InputPhoneField";

const resource: string = 'login';

const LoginPhoneForm = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const submitData = async () => {
    setIsProcessing(true);
    
    let payload: any = {
      country_code: (StaticData.countryPhoneCodes.find((o: any) => o.code === formData?.country))?.prefix,
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
    <View style={[Layout.formContainer, styles.container]}>
      
      <InputPhoneField
        resource={resource}
        fieldKey="phone"
        rules={['required', 'phone']}
        value={formData?.phone || ''}
        label={i18n.t('Phone number')}
        placeholder={i18n.t('Enter your phone number')}
        containerStyle={styles.inputTextFieldContainer}
      />

      <InputPasswordField
        resource={resource}
        fieldKey="password"
        rules={['required', 'string']}
        label={i18n.t('Password')}
        placeholder={i18n.t('Enter your password')}
        containerStyle={styles.inputTextFieldContainer}
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputTextFieldContainer: {
    backgroundColor: Layout.colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Layout.colors.primary,
  },
});

export default LoginPhoneForm;