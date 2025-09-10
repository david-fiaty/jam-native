import React, { ReactNode } from "react";
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import TextView from "../TextView";
import i18n from "@/translation/i18n";

type Props = {
  title?: string;
  description?: string;
  size?: number;
  titleColor?: string;
  backgroundColor?: string;
  children?: ReactNode;
};

const JamMarkerView = ({ title, description, size, titleColor, backgroundColor, children }: Props) => {
  const markerSize: number = size || 35;
  const markerBackgroundColor: string = backgroundColor || 'white';
  const markerTitleColor: string = titleColor || 'black';

  const titleContainerStyles: any = {
    borderRadius: Layout.radius.round*2,
    backgroundColor: markerBackgroundColor,
    paddingHorizontal: Layout.space.base*1.1,
    paddingVertical: Layout.space.base/1.5,
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
      <View style={titleContainerStyles}>
        <TextView 
          color={markerTitleColor}
          size={11.5}
          bold={true}
        >{i18n.t('JAM!')}</TextView>
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
