import React, { ReactNode } from "react";
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import IconView from "../IconView";
import TextView from "../TextView";

type Props = {
  title?: string;
  description?: string;
  size?: number;
  iconName?: string;
  titleColor?: string;
  outerColor?: string;
  innerColor?: string;
  zoomLevel?: any;
  children?: ReactNode;
};

const ProfileMarkerView = ({ title, description, size, iconName, titleColor, outerColor, innerColor, zoomLevel, children }: Props) => {
  const markerSize: number = size || 28;
  const markerOuterColor: string = outerColor || 'white';
  const markerInnerColor: string = innerColor || 'red';
  const markerTitleColor: string = titleColor || markerInnerColor;

  const iconSize: number = markerSize / 3;

  const outerCircleStyles: any = {
    width: markerSize,
    height: markerSize,
    borderRadius: markerSize / 2,
    backgroundColor: markerOuterColor,
  };

  const innerCircleStyles: any = {
    width: markerSize - Layout.space.base / 2,
    height: markerSize - Layout.space.base / 2,
    borderRadius: (markerSize - Layout.space.base / 2) / 2,
    backgroundColor: markerInnerColor,
  };

  const bottomArrowStyles: any = {
    marginTop: -(markerSize / 5),
    borderLeftWidth: markerSize / 2.5,
    borderRightWidth: markerSize / 2.5,
    borderTopWidth: markerSize / 3,
    borderTopColor: markerOuterColor,
  };

  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.titleContainer}>
          <TextView
            color={markerTitleColor}
            size={styles.titleContainer.fontSize}
          >
            {title}
          </TextView>
        </View>
      )}

      <View style={[styles.outerCircle, styles.outerShadow, outerCircleStyles]}>
        <View style={[styles.innerCircle, innerCircleStyles]}>
          {iconName && (
            <IconView
              name={iconName}
              theme="transparent"
              color="white"
              size={iconSize}
              padding={0}
            />
          )}

          {!iconName && children}
        </View>
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
    //marginBottom: Layout.space.base,
    maxWidth: 60,
    fontSize: 10,
  },
  outerCircle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
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
  outerShadow: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
  },
});

export default ProfileMarkerView;
