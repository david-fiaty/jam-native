import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import ButtonBase from '../base/ButtonBase';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import ImageView from '../view/ImageView';

const source = require('@/assets/images/facebook-logo.png'); 

const GoogleLoginButton = () => {
  return (
    <BoxView direction="row" align="center" justify="flex-start" style={styles.container}>
      <ImageView 
        source={source} 
        width={32}
        height={32}
        resizeMode="cover"
      />
      <TextView>{i18n.t('Continue with Facebook')}</TextView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 0.5, 
    borderColor: Colors.primary,
    borderRadius: Layout.radius.round,
    padding: Layout.space.base/2,
  },
});

export default GoogleLoginButton;