import React, { ReactNode } from 'react';
import { StyleSheet, View} from 'react-native';

type Props = {
  children: ReactNode;
};

const HorizontalContainer = ({children}: Props) => {
  return (
    <View style={styles.container}>{children}</View> 
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    height: '100%',
  },
});

export default HorizontalContainer;