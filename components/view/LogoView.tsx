import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import ImageBase from '@/components/base/ImageBase';

const source = require('@/assets/images/logo-48.png'); 

type Props = {
  size: object,
  style?: object,
};

export default ({size, style}: Props) => {
  return (
    <ImageBase source={source} width={size.width} height={size.height} />   
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Layout.space.base,
  },
});