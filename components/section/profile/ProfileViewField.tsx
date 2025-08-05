import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
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
    paddingHorizontal: Layout.space.base/1.4,
    paddingVertical: Layout.space.base/1.8,
    gap: 0,
  },
  label: {
    color: 'black',
    fontSize: 12,
    marginBottom: Layout.space.base/2,
  },
});

export default ProfileViewField;
