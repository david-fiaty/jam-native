import React, { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Config } from "@/constants/Config";
import i18n from "@/translation/i18n";
import InputTextField from '@/components/field/InputTextField';
import TextView from '@/components/view/TextView';
import ButtonView from '@/components/view/ButtonView';
import UserManager from "@/manager/UserManager";
import BoxView from "@/components/view/BoxView";
import LinkView from "@/components/view/LinkView";
import SkipButton from "@/components/button/SkipButton";
import SectionManager from "@/manager/SectionManager";
import FormManager from "@/manager/FormManager";
import SpinnerView from "@/components/view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import { Colors } from "@/constants/Colors";

const resource: string = 'signup';

const LoginEmailForm = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const submitForm = async () => {
    setIsProcessing(true);

    let payload: any = Config.forceLogin.enabled === true ? Config.forceLogin.credentials : formData;
    let result: any = await UserManager.login(payload);
    
    setIsProcessing(false);

    if (result?.error) {
      ScreenManager.showMessage({
        title: i18n.t('Profile login'),
        content: result.error,
      });
    }
    else {
      SectionManager.push(router, Config.mainSection);
    }
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
        containerStyle={styles.inputTextFieldContainer}
        placeholder={i18n.t('Email address')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'email', value, ['string', 'email'])}
      />

      <InputTextField
        containerStyle={styles.inputTextFieldContainer}
        placeholder={i18n.t('Password')}
        secureTextEntry={true}
        spellCheck={false}
        onChangeText={(value: string) => FormManager.updateField(resource, 'password', value, ['string'])}
      />

      <ButtonView
        label={i18n.t('Continue')}
        isProcessing={isProcessing}
        onPress={submitForm}
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
    backgroundColor: Colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Colors.primary,
  },
});

export default LoginEmailForm;