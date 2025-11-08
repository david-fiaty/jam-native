import React, { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import i18n from "@/translation/i18n";
import InputTextField from '@/components/field/InputTextField';
import ButtonView from '@/components/view/ButtonView';
import UserManager from "@/manager/UserManager";
import SectionManager from "@/manager/SectionManager";
import SpinnerView from "@/components/view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import InputPasswordField from "@/components/field/InputPasswordField";

const resource: string = 'login';

const LoginEmailForm = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const submitForm = async () => {
    setIsProcessing(true);

    let payload: any = Config.forceLogin.enabled === true ? Config.forceLogin.credentials : formData;
    let result: any = await UserManager.login(payload);

    if (result?.success === false) {
      ScreenManager.showMessage({
        title: i18n.t('Profile login'),
        content: i18n.t('Invalid user name or password.'),
      });

      setIsProcessing(false);
    }
    else {
      SectionManager.push(router, Config.mainSection);
    }
  };

  const isSubmitDisabled = () => {
    return !Config.forceLogin.enabled === true && (!formData?.email?.length || !formData?.password?.length);
  };

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={[Layout.formContainer, styles.container]}>
      <InputTextField
        resource={resource}
        fieldKey="email"
        rules={['required', 'email']}
        label={i18n.t('Email')}
        placeholder={i18n.t('Enter your email address')}
        theme="white"
      />

      <InputPasswordField
        resource={resource}
        fieldKey="password"
        rules={['required', 'string']}
        label={i18n.t('Password')}
        placeholder={i18n.t('Enter your password')}
        theme="white"
      />

      <ButtonView
        label={i18n.t('Continue')}
        isProcessing={isProcessing}
        onPress={submitForm}
        disabled={isSubmitDisabled()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    alignSelf: 'flex-start',
  },
  inputTextFieldContainer: {
    backgroundColor: Layout.colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Layout.colors.primary,
  },
});

export default LoginEmailForm;