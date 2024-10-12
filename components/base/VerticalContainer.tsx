import React, { ReactNode } from 'react';
import { StyleSheet, View} from 'react-native';

type Props = {
  children: ReactNode;
};

const VerticalContainer = ({children}: Props) => {
  return (
    <View style={styles.container}>{children}</View> 
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
  },
});

export default VerticalContainer;