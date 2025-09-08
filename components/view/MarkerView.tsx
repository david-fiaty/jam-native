import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {  
  size?: any;
};

const markerSize = 60;

const MarkerView = ({ size }: Props) => {

  const outerCircleStyles: any = {
    width: markerSize,
    height: markerSize,
    borderRadius: markerSize/2,
  };

  const innerCircleStyles: any = {
    width: markerSize - Layout.space.base,
    height: markerSize - Layout.space.base,
    borderRadius: (markerSize - Layout.space.base)/2,
  };

  const bottomArrowStyles: any = {
    marginTop: -markerSize/7.5,
    borderLeftWidth: markerSize/3,
    borderRightWidth: markerSize/3,
    borderTopWidth: markerSize/3,
  };

  return (
      <View style={styles.container}>
        <View style={[styles.outerCircle, outerCircleStyles]}>
          <View style={[styles.innerCircle, innerCircleStyles]}>

          </View>
        </View>
        <View style={[styles.bottomArrow, bottomArrowStyles]} />
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
    backgroundColor: 'white',
  },
  innerCircle: {
    backgroundColor: 'red',
  },
  bottomArrow: {
    width: 0,
    height: 0,
    borderBottomWidth: 0,
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white", 
  },
});

export default MarkerView;
