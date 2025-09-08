import React, { ReactNode } from "react";
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import IconView from "./IconView";

type Props = {
  size?: number;
  iconName?: string;
  outerColor?: string;
  innerColor?: string;
  children?: ReactNode;
};

const MarkerView = ({ size, iconName, outerColor, innerColor, children }: Props) => {
  const markerSize: number = size || 40;
  const markerOuterColor: string = outerColor || 'white';
  const markerInnerColor: string = innerColor || 'red';
  
  const iconSize: number = markerSize/3; 
  
  const outerCircleStyles: any = {
    width: markerSize,
    height: markerSize,
    borderRadius: markerSize / 2,
    backgroundColor: markerOuterColor,
  };

  const innerCircleStyles: any = {
    width: markerSize - Layout.space.base/2,
    height: markerSize - Layout.space.base/2,
    borderRadius: (markerSize - Layout.space.base/2) / 2,
    backgroundColor: markerInnerColor,
  };

  const bottomArrowStyles: any = {
    marginTop: -markerSize / 5,
    borderLeftWidth: markerSize / 2.5,
    borderRightWidth: markerSize / 2.5,
    borderTopWidth: markerSize / 3,
    borderTopColor: markerOuterColor,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.outerCircle, outerCircleStyles]}>
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
    backgroundColor: 'black',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default MarkerView;
