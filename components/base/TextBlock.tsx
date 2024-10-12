import { StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import React, { ReactNode } from 'react';

type Props = {
  fontSize?: number,
  textTransform?: boolean,
  textDecoration?: boolean,
  children: ReactNode,
};

const TextBlock = ({fontSize, textTransform, textDecoration, children}: Props) => {
  return (
    <Text style={styles.text}>{children}</Text>   
  );
};

const styles = StyleSheet.create({
  text: GlobalStyles.text,
});

export default TextBlock;