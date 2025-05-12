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
import CountryPhoneCodeField from "@/components/field/CountryPhoneCodeField";
import PhoneServiceField from "@/components/field/PhoneServiceField";

const resource: string = 'signup';

const SignupPhoneForm = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const submitData = async () => {
    setIsProcessing(true);

    let result: any = await UserManager.sendSignupCode({ email: formData?.email });

    if (result.success === false) {
      ScreenManager.showMessage({
        title: i18n.t('Registration error'),
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
  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={[Layout.formContainer, styles.container]}>
      <TextView style={styles.label}>{i18n.t('Country')}</TextView>
      <CountryPhoneCodeField
        value={formData?.country || ''}
        //onChangeText={(value: string) => FormManager.updateField(resource, 'country', value, ['string'])}
      />
      {FormManager.renderError('country')}


      <TextView style={styles.label}>{i18n.t('Phone')}</TextView>
      <InputTextField
        value={formData?.phone || ''}
        placeholder={i18n.t('Enter your phone nnumber')}
        onChangeText={(value: string) => FormManager.updateField(resource, 'phone', value, ['string'])}
        //disabled={isEmailFieldDisabled()}
      />
      {FormManager.renderError('phone')}

      <TextView style={styles.label}>{i18n.t('Phone service')}</TextView>
      <PhoneServiceField 
        onChangeValue={((option: any) => FormManager.updateField(resource, 'phone_service', option.id, ['string']))}
      />

      {!isEmailFieldDisabled() && (
        <ButtonView
          label={i18n.t('Continue')}
          isProcessing={isProcessing}
          onPress={submitData}
          disabled={isSubmitButtonDisabled()}
        />
      )}

      {!isEmailFieldDisabled() && (
        <>
          <BoxView
            direction="row"
            align="center"
            justify="space-between"
            style={{ width: "100%" }}
          >
            <BoxView direction="row" align="center" justify="flex-start">
              <TextView>{i18n.t("You have an account?")}</TextView>
              <LinkView onPress={() => SectionManager.push(router, 'login')}>
                {i18n.t("Sign in")}
              </LinkView>
            </BoxView>
            <SkipButton onPress={() => SectionManager.push(router, Config.mainSection)} />
          </BoxView>
        </>
      )}
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
});

export default SignupPhoneForm;