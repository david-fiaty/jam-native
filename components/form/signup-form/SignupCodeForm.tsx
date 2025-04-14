import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { setValue } from '@/redux/slices/SignupSlice';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import InputTextField from '@/components/field/InputTextField';
import TextView from '@/components/view/TextView';
import ButtonView from '@/components/view/ButtonView';
import UserManager from "@/manager/UserManager";

const SignupCodeForm = () => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.signup);

  const updateData = (key: any, value: any) => {
    dispatch(setValue({
      key: key,
      value: value,
    }));
  };

  const submitData = async () => {    
    setIsProcessing(true);

    let result: any = await UserManager.verifySignupCode({
      session: formData?.session,
      code: formData?.code,
    });

    if (result?.message) {

    }

    setIsProcessing(false);
  };

  const isSubmitButtonDisabled = () => { 
    return !formData?.code?.length;
  };

  return (
    <>
      <TextView style={styles.label}>{i18n.t('Verification sent, check your email inbox')}</TextView>
      <InputTextField
        value={formData?.code || ''}
        placeholder={i18n.t('Verification code')}
        onChangeText={(value: string) => updateData('code', value)}
      />

      <ButtonView
        label={i18n.t('Continue')}
        isProcessing={isProcessing}
        onPress={submitData}
        disabled={isSubmitButtonDisabled()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  slogan: {
    textTransform: 'uppercase',
    fontSize: Layout.fontSize.base,
  },
  label: {
    alignSelf: 'flex-start',
  },
});

export default SignupCodeForm;