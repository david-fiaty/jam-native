import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";
import IconView from "../view/IconView";

type Props = {
  label?: any;
  iconRight?: any
  children?: ReactNode;
};

const ProfileViewField = ({ label, iconRight, children }: Props) => {
  return (
    <BoxView style={styles.container} direction="column" align="flex-start" justify="flex-start">
      {label && (
        <TextView style={styles.label}>{label}</TextView>
      )}

      {children}

      {iconRight && (
        <IconView 
          name={iconRight} 
          size={18}
          containerStyle={styles.iconRight} 
        /> 
      )}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
    color: Layout.colors.black,
    fontSize: 12,
    marginBottom: Layout.space.base/2.3,
  },
  iconRight: {
    position: 'absolute',
    right: Layout.space.base,
    top: 0,
    bottom: 0,
  },
});

export default ProfileViewField;
