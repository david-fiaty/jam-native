import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import { Config } from '@/constants/Config';
import ImageView from './ImageView';

type Props = BaseProps & {
  size: object,
  style?: object,
};

// Todo - Move image size to config
const path: any = require('@/assets/images/logo-512.png'); 

const LogoView = ({size, style}: Props) => {
  return (
    <ImageView 
      path={path} 
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