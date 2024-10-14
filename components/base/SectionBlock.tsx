import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  style?: object,
  children?: ReactNode,
};

const SectionBlock = ({style, children}: Props) => {
  return (
    <View style={styles.container}>{children}</View>   
  );
};


const styles = StyleSheet.create({
  container: {
    
  },
});

export default SectionBlock;