import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Layout } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import LogoView from "../view/LogoView";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import DividerView from "../view/DividerView";
import SignupForm from "../form/SignupForm";

const SignupScreen = () => {
  
  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      scroll={true}
      style={[Layout.screenContent, styles.container]}
    >
      <LogoView size={80} />

      <TextView style={styles.wecomeMessage}>
        {i18n.t("Create a jam account")}
      </TextView>

      <SignupForm />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Layout.space.base*2,
  },
  label: {
    alignSelf: 'flex-start',
  },
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
