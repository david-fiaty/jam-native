import React, { ReactNode } from "react";
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import IconView from "../IconView";
import TextView from "../TextView";
import i18n from "@/translation/i18n";

type Props = {
  title?: string;
  description?: string;
  size?: number;
  iconName?: string;
  titleColor?: string;
  backgroundColor?: string;
  children?: ReactNode;
};

const JamMarkerView = ({ title, description, size, iconName, titleColor, backgroundColor, children }: Props) => {
  const markerSize: number = size || 35;
  const markerBackgroundColor: string = backgroundColor || 'white';

  const titleContainerStyles: any = {
    borderRadius: Layout.radius.round,
    backgroundColor: markerBackgroundColor,
    padding: Layout.space.base/2,
  };

  const bottomArrowStyles: any = {
    marginTop: -(markerSize / 5),
    borderLeftWidth: markerSize / 2.5,
    borderRightWidth: markerSize / 2.5,
    borderTopWidth: markerSize / 3,
    borderTopColor: markerBackgroundColor,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, titleContainerStyles]}>
        <TextView>{i18n.t('JAM')}</TextView>
      </View>
      <View style={[styles.bottomArrow, bottomArrowStyles]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {

  },
  bottomArrow: {
    width: 0,
    height: 0,
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

export default JamMarkerView;
