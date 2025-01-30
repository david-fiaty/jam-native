import { useState } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
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
import SectorsField from "../field/SectorsField";
import ProfileTypeField from "../field/ProfileTypeField";
import CountryField from "../field/CountryField";
import { View } from "react-native";
import { Config } from "@/constants/Config";

const SignupScreen = () => {
  const router = useRouter();
  const [signupData, setSignupData] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);

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
        <InputTextField
          containerStyle={styles.inputTextFieldContainer}
          placeholder={i18n.t("User name")}
          value={signupData?.email}
          onChangeText={(value: string) => updateField("username", value)}
        />

        <InputTextField
          containerStyle={styles.inputTextFieldContainer}
          placeholder={i18n.t("Email address")}
          value={signupData?.email}
          onChangeText={(value: string) => updateField("email", value)}
        />

        <InputTextField
          containerStyle={styles.inputTextFieldContainer}
          placeholder={i18n.t("Password")}
          secureTextEntry={true}
          autoCapitalize={false}
          spellCheck={false}
          value={signupData?.password}
          onChangeText={(value: string) => updateField("password", value)}
        />

        <DividerView theme="secondary" />

        <InputTextField
          containerStyle={styles.inputTextFieldContainer}
          placeholder={i18n.t("Profile name")}
          value={signupData?.profile?.profile_name}
          onChangeText={(value: string) =>
            updateField("profile", {
              ...(signupData?.profile || {}),
              ...{ profile_name: value },
            })
          }
        />

        <ProfileTypeField
          value={signupData?.profile?.profile_type}
          onChangeValue={(option: any) =>
            updateField("profile", {
              ...(signupData?.profile || {}),
              ...{ profile_type: option.value },
            })
          }
        />

        {signupData?.profile?.profile_type == "personal" && (
          <InputTextField
            containerStyle={styles.inputTextFieldContainer}
            placeholder={i18n.t("First name")}
            value={signupData?.profile?.profile_personal?.first_name}
            onChangeText={(value: string) => {
              let profilePersonal = Object.assign(
                {},
                signupData?.profile?.profile_personal || {}
              );
              profilePersonal["first_name"] = value;
              updateField("profile", {
                ...(signupData?.profile || {}),
                ...{ profile_personal: profilePersonal },
              });
            }}
          />
        )}

        {signupData?.profile?.profile_type == "personal" && (
          <InputTextField
            containerStyle={styles.inputTextFieldContainer}
            placeholder={i18n.t("Last name")}
            value={signupData?.profile?.profile_personal?.last_name}
            onChangeText={(value: string) => {
              let profilePersonal = Object.assign(
                {},
                signupData?.profile?.profile_personal || {}
              );
              profilePersonal["last_name"] = value;
              updateField("profile", {
                ...(signupData?.profile || {}),
                ...{ profile_personal: profilePersonal },
              });
            }}
          />
        )}

        <CountryField
          value={signupData?.profile?.scope_country_code}
          onChangeValue={(option: any) =>
            updateField("profile", {
              ...(signupData?.profile || {}),
              ...{ scope_country_code: option.value },
            })
          }
        />

        <DividerView theme="secondary" />

{ /*
        <SectorsField
          onPressEvent={() => ScreenManager.toggleModal("SectorsList", {
            reducer: 'signupForm',
          })}
        />

        <DividerView theme="secondary" />
        */ }


        <ButtonView
          label={i18n.t("Continue")}
          isProcessing={isProcessing}
          onPress={() => {
            setIsProcessing(true);
            submitForm();
          }}
        />

        <BoxView
          direction="row"
          align="center"
          justify="space-between"
          style={{ width: "100%" }}
        >
          <BoxView direction="row" align="center" justify="flex-start">
            <TextView>{i18n.t("Already have an account?")}</TextView>
            <LinkView onPress={async () => router.replace("/login")}>
              {i18n.t("Sign in")}
            </LinkView>
          </BoxView>
          <SkipButton onPress={async () => router.replace(Config.mainRoute)} />
        </BoxView>

        <DividerView />
        <GoogleLoginButton />
        <FacebookLoginButton />
        <InstagramLoginButton />
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
