import React, { useState, useEffect, ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Input } from "@rneui/themed";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";

type Props = {
  label?: any;
  children?: ReactNode;
};

const ProfileViewField = ({ label, children }: Props) => {
  return (
    <BoxView style={[styles.container]}>
      {label && (
        <TextView style={styles.label}>{label}</TextView>
      )}

      {children}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Layout.colors.secondary,
    borderWidth: Layout.borderWidth.base,
    borderColor: Layout.colors.secondary,
    borderRadius: Layout.radius.round,
    padding: Layout.space.base,
  },
  label: {
    color: 'black',
  },
});

export default ProfileViewField;
