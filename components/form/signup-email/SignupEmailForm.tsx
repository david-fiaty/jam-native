import React, { useState } from "react";
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
import ScreenManager from "@/manager/ScreenManager";

const resource: string = 'signup';

const SignupEmailForm = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
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

  const isEmailDisabled = () => {
    return formData?.email?.length && formData?.session?.length;
  };

  const isSubmitDisabled = () => {
    return !formData?.email?.length;
  };

  return (
    <View style={Layout.formContainer}>
      <InputTextField
        resource={resource}
        fieldKey="email"
        rules={['required', 'email']}
        value={formData?.email || ''}
        label={i18n.t('Email address')}
        placeholder={i18n.t('Enter your email address')}
        disabled={isEmailDisabled()}
        containerStyle={styles.inputTextFieldContainer}
        trim={true}
      />

      {!isEmailDisabled() && (
        <ButtonView
          label={i18n.t('Continue')}
          isProcessing={isProcessing}
          onPress={submitData}
          disabled={isSubmitDisabled()}
        />
      )}

      {!isEmailDisabled() && (  
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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

export default SignupEmailForm;