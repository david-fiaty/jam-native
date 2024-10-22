import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import ImageBase from '@/components/base/ImageBase';
import { BaseProps } from '@/constants/Types';

type Props = BaseProps & {
  size: object,
  style?: object,
};

const source = require('@/assets/images/logo-48.png'); 

const LogoView = ({size, style}: Props) => {
  return (
    <ImageBase 
      source={source} 
      width={size.width} 
      height={size.height} 
      style={style}
    />   
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

export default LogoView;