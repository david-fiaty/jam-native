import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {  
  size?: any;
};

const markerSize = 60;

const MarkerView = ({ size }: Props) => {

  const outerCircleStyles: any = {

  };

  const innerCircleStyles: any = {

  };

  const bottomArrowStyles: any = {

  };

  return (
      <View style={styles.container}>
        <View style={[styles.outerCircle]}>
          <View style={[styles.innerCircle]}>

          </View>
        </View>
        <View style={[styles.bottomArrow]} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: markerSize,
    height: markerSize,
    backgroundColor: "white",
    borderRadius: markerSize/2,
  },
  innerCircle: {
    width: markerSize - Layout.space.base,
    height: markerSize - Layout.space.base,
    backgroundColor: "red",
    borderRadius: (markerSize - Layout.space.base)/2,
  },
  bottomArrow: {
    width: 0,
    height: 0,
    marginTop: -markerSize/7.5,
    borderLeftWidth: markerSize/3,
    borderRightWidth: markerSize/3,
    borderTopWidth: markerSize/3,
    borderBottomWidth: 0,
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white", 
  },
});

export default MarkerView;
