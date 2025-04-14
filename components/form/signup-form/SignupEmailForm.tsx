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

const SignupEmailForm = () => {
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

    let result: any = await UserManager.sendSignupCode({
      email: formData?.email,
    });

    if (result?.session?.length > 0) {
      updateData('session', result.session);
    }

    setIsProcessing(false);
  };

  const isSubmitButtonDisabled = () => { 
    return !formData?.email;
  };

  return (
    <>
      <TextView style={styles.label}>{i18n.t('Email')}</TextView>
      <InputTextField
        value={formData?.email || ''}
        placeholder={i18n.t('Enter your email address')}
        onChangeText={(value: string) => updateData('email', value)}
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

export default SignupEmailForm;