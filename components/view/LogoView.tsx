import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import ImageView from './ImageView';

type Props = {
  size: any;
  style?: object;
};

const path: any = require('@/assets/images/logo-512.png'); 

const LogoView = ({size, style}: Props) => {
  return (
    <ImageView 
      path={path} 
      width={size} 
      height={size} 
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