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
import StaticData from "@/constants/StaticData";

const resource: string = 'signup';

const SignupPhoneForm = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const phoneServices: any[] = [
    {
      id: 'sms',
      label: i18n.t('SMS'),
      default: true,
    },
    {
      id: 'whatsapp',
      label: i18n.t('Whatsapp'),
    },
  ];

  const submitForm = async () => {
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

  const isSubmitDisabled = () => {
    return !formData?.country?.length || !formData?.phone?.length || !formData?.phone_service?.length;
  };

  useEffect(() => {
    if (!isLoaded) {
      // Todo - Set phone_service = 'whatsapp' in form data

      FormManager.updateField(resource, 'phone_service', (phoneServices.find((o: any) => o.default === true))?.id);
      setIsLoaded(true);
    }
  }, [isLoaded, resource, phoneServices]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <View style={[Layout.formContainer, styles.container]}>
      <TextView style={styles.label}>{i18n.t('Country')}</TextView>
      <CountryPhoneCodeField
        value={formData?.country || ''}
        onChangeValue={(option: any) => FormManager.updateField(resource, 'country', option.value, ['string'])}
      />
      {FormManager.renderError('country')}

      <TextView style={styles.label}>{i18n.t('Phone number')}</TextView>
      <InputTextField
        value={formData?.phone || ''}
        placeholder={i18n.t('Enter your phone number')}
        keyboardType="number-pad"
        onChangeText={(value: string) => FormManager.updateField(resource, 'phone', value, ['number'])}
      />
      {FormManager.renderError('phone')}

      <ButtonView
        label={i18n.t('Continue')}
        isProcessing={isProcessing}
        onPress={submitForm}
        disabled={isSubmitDisabled()}
      />

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