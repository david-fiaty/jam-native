import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from '@/redux/slices/SignupSlice';
import { Layout } from '@/constants/Layout';
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

const SignupEmailForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const formData: any = useSelector((state: any) => state.signup);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const updateData = (key: any, value: any) => {
    dispatch(setValue({
      key: key,
      value: value,
    }));
  };

  const submitData = async () => {
    setIsProcessing(true);

    let result: any = await UserManager.sendSignupCode({
      email: formData?.email,
    });

    if (result?.session?.length > 0) {
      updateData('session', result.session);
    }

    setIsProcessing(false);
  };

  const isSubmitButtonDisabled = () => {
    return !formData?.email?.length;
  };

  const isEmailFieldDisabled = () => {
    return formData?.email?.length && formData?.session?.length;
  };

  return (
    <>
      <TextView style={styles.label}>{i18n.t('Email')}</TextView>
      <InputTextField
        value={formData?.email || ''}
        placeholder={i18n.t('Enter your email address')}
        onChangeText={(value: string) => updateData('email', value)}
        disabled={isEmailFieldDisabled()}
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
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
  },
});

export default SignupEmailForm;