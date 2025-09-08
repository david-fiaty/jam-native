import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {

};

const MarkerView = ({  }: Props) => {
  return (
      <View style={styles.container}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>

          </View>
        </View>
        <View style={styles.bottomArrow} />
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
    width: 60,
    height: 60,
    backgroundColor: "black",
    borderRadius: 30,
  },
  innerCircle: {
    width: 50,
    height: 50,
    backgroundColor: "yellow",
    borderRadius: 25,
  },
  bottomArrow: {
    width: 0,
    height: 0,
    marginTop: -8,
    borderLeftWidth: 18,
    borderRightWidth: 18,
    borderTopWidth: 18,
    borderBottomWidth: 0,
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "blue", 
  },
});

export default MarkerView;
