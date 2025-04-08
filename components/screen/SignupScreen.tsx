import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
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

const SignupScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEmailStepValid, setIsEmailStepValid] = useState(false);
  const [isCodeStepValid, setIsCodeStepValid] = useState(false);
  const formData = useSelector((state: any) => state.form.profile);
  const profileFields: any = ProfileManager.getFields();
  
  const updateField = (key: any, value: any) => {
    dispatch(setFormData<any>({ 
      resource: 'profile',
      key: key, 
      value: value, 
    }));
  };

  const submitForm = async () => {
    setIsProcessing(true);
    let payload: any = {...formData};
    let result: any = null;

    if (!isEmailStepValid) {
      result = await UserManager.sendSignupCode(payload);
      if (result?.session?.length > 0) {
        payload.session = result.session;
        setIsEmailStepValid(true);
      }      
    }
    else if (!isCodeStepValid) {
      result = await UserManager.verifySignupCode(payload);

      console.log('verif code response', result);
      
      if (!result?.error) {
        setIsCodeStepValid(true);
      }
    }
    else {

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
                <TextView>{i18n.t('Verificatioin code sent, check your mailbox')}</TextView>
                <InputTextField
                  placeholder={i18n.t('Enter verification code')}
                  value={formData?.code || ''}
                  onChangeText={(value: string) => updateField('code', value)}
                />
              </>
            )}

            { isEmailStepValid && isCodeStepValid && profileFields.map((item: any) => {
              return ProfileManager.renderField('signup', item, formData);
            })}

            <DividerView />

            <ButtonView
              label={i18n.t('Continue')}
              isProcessing={isProcessing}
              onPress={submitForm}
            />
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
