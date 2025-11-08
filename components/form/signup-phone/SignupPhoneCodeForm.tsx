import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { Config } from "@/constants/Config";
import i18n from "@/translation/i18n";
import InputTextField from '@/components/field/InputTextField';
import ButtonView from '@/components/view/ButtonView';
import UserManager from "@/manager/UserManager";
import BoxView from "@/components/view/BoxView";
import LinkView from "@/components/view/LinkView";
import SkipButton from "@/components/button/SkipButton";
import SectionManager from "@/manager/SectionManager";
import FormManager from "@/manager/FormManager";
import { View } from "react-native";
import { Layout } from "@/constants/Layout";

const resource: string = 'signup';

const SignupPhoneCodeForm = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const submitData = async () => {
    setIsProcessing(true);

    let result: any = await UserManager.verifySignupCode({
      session: formData?.session,
      code: formData?.code,
    });

    if (result?.message) {
      FormManager.updateField(resource, 'success', true);
    }

    setIsProcessing(false);
  };

  const isSubmitButtonDisabled = () => {
    return !formData?.code?.length;
  };

  return (
    <View style={Layout.formContainer}>
      <InputTextField
        resource={resource}
        fieldKey="code"
        rules={['required', 'number']}
        value={formData?.code || ''}
        label={i18n.t('Verification sent, check your email inbox')}
        placeholder={i18n.t('Verification code')}
        keyboardType="number-pad"
      />

      <ButtonView
        label={i18n.t('Continue')}
        isProcessing={isProcessing}
        onPress={submitData}
        disabled={isSubmitButtonDisabled()}
      />

      <BoxView
        direction="row"
        align="center"
        justify="space-between"
        style={{ width: "100%" }}
      >
        <BoxView direction="row" align="center" justify="flex-start">
          <LinkView onPress={() => SectionManager.push(router, 'signup', { reset: true })}>
            {i18n.t("Didn't receive code?")}
          </LinkView>
        </BoxView>
        <SkipButton onPress={() => SectionManager.push(router, Config.mainSection)} />
      </BoxView>
    </View>
  );
};

export default SignupPhoneCodeForm;