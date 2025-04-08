import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { setFormData, resetFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { Config } from "@/constants/Config";
import LogoView from "../view/LogoView";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import UserManager from "@/manager/UserManager";
import ScreenManager from "@/manager/ScreenManager";
import DividerView from "../view/DividerView";
import ProfileManager from "@/manager/ProfileManager";
import ButtonView from "../view/ButtonView";
import InputTextField from "../field/InputTextField";
import VerificationCodeField from "../field/VerificationCodeField";
import SkipButton from "../button/SkipButton";
import LinkView from "../view/LinkView";

const SignupScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isEmailStepValid, setIsEmailStepValid] = useState<boolean>(false);
  const [isCodeStepValid, setIsCodeStepValid] = useState<boolean>(false);
  const formData = useSelector((state: any) => state.form.profile);
  const profileFields: any = ProfileManager.getFields();
  
  const updateField = (key: any, value: any) => {
    dispatch(setFormData<any>({ 
      resource: 'profile',
      key: key, 
      value: value, 
    }));
  };

  const resetForm = () => {
    dispatch(resetFormData<any>({ 
      resource: 'profile',
    }));
  };

  const submitForm = async () => {
    setIsProcessing(true);
    let payload: any = {...formData};
    let result: any = null;

    if (!isEmailStepValid) {
      result = await UserManager.sendSignupCode(payload);
      if (result?.session?.length > 0) {
        updateField('session', result.session);
        setIsEmailStepValid(true);
      }      
    }
    else if (!isCodeStepValid) {
      result = await UserManager.verifySignupCode(payload);
      if (!result?.error) {
        setIsCodeStepValid(true);
      }
    }
    else {
      // Submit profile data here
    }
    
    setIsProcessing(false);

    //
    /*
    if (result?.error) {
      ScreenManager.showMessage({
        title: i18n.t('Profile registration'),
        content: result.error,
      });
    }
    else {
      router.replace(Config.mainRoute);
    }
      */
  }

  const findField = (key: string) => {
    return profileFields.find((o: any) => o.key == key);
  };

  const isSubmitDisabled = () => {
    return !formData?.email?.length
    || (isEmailStepValid && !formData?.code?.length);
  };

  useEffect(() => {
    if (!isLoaded) {
      resetForm();
      setIsLoaded(true);
    }
  }, [isLoaded]);

  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      scroll={true}
      style={Layout.screenContent}
    >
      <LogoView size={80} />

      <TextView style={styles.wecomeMessage}>
        {i18n.t("Create an account")}
      </TextView>

      <DividerView />

      <View style={Layout.formContainer}>
        <BoxView
          align="flex-start"
          justify="flex-start"
          scroll={true}
          style={[Layout.screenContent, ProfileManager.getStyles().container]}
        >
          <View style={Layout.formContainer}>
            { !isEmailStepValid && ProfileManager.renderField('signup', findField('email'), formData)}

            { isEmailStepValid && !isCodeStepValid && (
              <>
                { ProfileManager.renderField('signup', findField('email'), formData, {disabled: true}) }

                <VerificationCodeField 
                  value={formData?.code || ''}
                  onChangeText={(value: any) => updateField('code', value)}
                  disabled={false}
                />
              </>
            )}

            { isEmailStepValid && isCodeStepValid && profileFields.map((item: any) => {
              return ProfileManager.renderField('signup', item, formData);
            })}

            <ButtonView
              label={i18n.t('Continue')}
              isProcessing={isProcessing}
              disabled={isSubmitDisabled()}
              onPress={submitForm}
            />
          
            <BoxView
              direction="row"
              align="center"
              justify="space-between"
              style={{ width: "100%" }}
            >
              <BoxView direction="row" align="center" justify="flex-start">
                <TextView>{i18n.t("You have an account?")}</TextView>
                <LinkView onPress={async () => router.replace("/login")}>
                  {i18n.t("Sign in")}
                </LinkView>
              </BoxView>
              <SkipButton onPress={async () => router.replace(Config.mainRoute)} />
            </BoxView>

          </View>
        </BoxView>
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  inputTextFieldContainer: {
    backgroundColor: Colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Colors.primary,
  },
  wecomeMessage: {
    textTransform: "uppercase",
    fontSize: Layout.fontSize.base,
  },
});

export default SignupScreen;
