import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import ImageView from './ImageView';

type Props = BaseProps & {
  size: any,
  style?: any,
};

const NoImageView = ({size, style}: Props) => {
  // Todo - Move image size to config
  const path: any =require('@/assets/images/logo-mono-1200.jpg');

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

export default NoImageView;