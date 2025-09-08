import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {

};

const MarkerView = ({  }: Props) => {
  return (
      <View style={styles.container}>
        <View style={styles.circle} />
        <View style={styles.arrow} />
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
  circle: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 25,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 0,
    borderTopWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "blue", 
    marginTop: -5,
  },
});

export default MarkerView;
