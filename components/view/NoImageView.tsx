import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import ImageView from './ImageView';
import BoxView from './BoxView';

type Props = {
  width?: any;
  height?: any;
  rounded?: boolean;
  containerStyle?: any;
};

const NoImageView = ({width, height, rounded, containerStyle}: Props) => {
  const path: any = require('@/assets/images/logo-mono-512.png');
  const boxStyles = rounded == true ? {width: width, height: height} : {};  

  return (
    <BoxView 
      align="center" 
      justify="center" 
      style={[styles.container, containerStyle, boxStyles]}
    >
      <ImageView 
        path={path} 
        width={width/2} 
        height={height/2} 
        style={styles.image}
      />   
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Layout.colors.secondary,
    borderRadius: Layout.radius.round,
  },
  image: {
    opacity: 0.5,
  },
});

export default NoImageView;