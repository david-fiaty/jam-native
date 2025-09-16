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
  zoomLevel?: any;
  children?: ReactNode;
};

const JamMarkerView = ({ title, description, size, titleColor, backgroundColor, zoomLevel, children }: Props) => {
  const markerSize: number = size || 35;
  const markerBackgroundColor: string = backgroundColor || 'white';
  const markerTitleColor: string = titleColor || 'black';

  const titleContainerStyles: any = {
    borderRadius: Layout.radius.round * 2,
    backgroundColor: markerBackgroundColor,
    paddingHorizontal: Layout.space.base / 1.2,
    paddingVertical: Layout.space.base / 4,
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
        <TextView
          color={markerTitleColor}
          size={9}
          bold={true}
        >
          {i18n.t('JAM')}
        </TextView>
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
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
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
