import { useState } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import { Config } from "@/constants/Config";
import LogoView from "../view/LogoView";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import InputTextField from "../field/InputTextField";
import SkipButton from "../button/SkipButton";
import GoogleLoginButton from "../button/GoogleLoginButton";
import FacebookLoginButton from "../button/FacebookLoginButton";
import InstagramLoginButton from "../button/InstagramLoginButton";
import UserManager from "@/manager/UserManager";
import LinkView from "../view/LinkView";
import ButtonView from "../view/ButtonView";
import ScreenManager from "@/manager/ScreenManager";
import DividerView from "../view/DividerView";
import ProfileTypeField from "../field/ProfileTypeField";
import CountryField from "../field/CountryField";

import ProfileManager from "@/manager/ProfileManager";

import PersonSignup from "./signup/PersonSignup";
import OrganizationSignup from "./signup/OrganizationSignup";
import VenueSignup from "./signup/VenueSignup";
import ProfileForm from "../form/ProfileForm";

const SignupScreen = () => {
  const router = useRouter();
  const [signupData, setSignupData] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const formData = useSelector((state: any) => state.form.profile);

  const updateField = (key: string, value: any) => {
    setSignupData({ ...signupData, ...{ [key]: value } });
  };

  const submitForm = async () => {
    setIsProcessing(true);
    let result: any = await UserManager.register(signupData);
    setIsProcessing(false);

    if (result?.error) {
      ScreenManager.showMessage({
        title: i18n.t('Profile registration'),
        content: result.error,
      });
    }
    else {
      router.replace(Config.mainRoute);
    }
  }

  console.log(formData);

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
          style={[Layout.screenContent, ProfileManager.getContainerStyles()]}
        >
          <View style={Layout.formContainer}>
            {ProfileManager.getFields().map((item: any) => {
              return ProfileManager.renderField(item, formData);
            })}
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
