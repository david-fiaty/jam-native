import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {  
  size?: any;
  outerColor?: string;
  innerColor?: string;
};

const MarkerView = ({ size, outerColor, innerColor }: Props) => {
  const markerSize = size || 60;
  const markerOuterColor = outerColor || 'white';
  const markerInnerColor = innerColor || 'red';
  
  const outerCircleStyles: any = {
    width: markerSize,
    height: markerSize,
    borderRadius: markerSize/2,
    backgroundColor: markerOuterColor,
  };

  const innerCircleStyles: any = {
    width: markerSize - Layout.space.base,
    height: markerSize - Layout.space.base,
    borderRadius: (markerSize - Layout.space.base)/2,
    backgroundColor: markerInnerColor,
  };

  const bottomArrowStyles: any = {
    marginTop: -markerSize/5,
    borderLeftWidth: markerSize/2.5,
    borderRightWidth: markerSize/2.5,
    borderTopWidth: markerSize/3,
    borderTopColor: markerOuterColor, 
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
  },
  innerCircle: {
    
  },
  bottomArrow: {
    width: 0,
    height: 0,
    borderBottomWidth: 0,
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
});

export default MarkerView;
