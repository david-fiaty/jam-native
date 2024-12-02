import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import ImageView from './ImageView';
import BoxView from './BoxView';
import { Colors } from '@/constants/Colors';

type Props = BaseProps & {
  size: any,
};

const NoImageView = ({size}: Props) => {
  // Todo - Move image size to config
  const path: any = require('@/assets/images/logo-mono-512.png');

  return (
    <BoxView align="center" justify="center" style={styles.container}>
      <ImageView 
        path={path} 
        width={size} 
        height={size} 
        style={styles.image}
      />   
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    borderRadius: Layout.radius.round,
    width: 96.7,
    height: 96.7,
  },
  image: {
    opacity: 0.5,
  },
});

export default NoImageView;