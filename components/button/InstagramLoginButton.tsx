import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';
import ImageView from '../view/ImageView';

const source = require('@/assets/images/instagram-logo.png');

const InstagramLoginButton = () => {

  const onPress = () => {
    // Todo - Implement instagram login buton
    console.log('on instagram button press');
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <BoxView 
        direction="row" 
        align="center" 
        justify="flex-start"
      >
        <ImageView
          path={source}
          width={32}
          height={32}
          resizeMode="cover"
        />
        <TextView>{i18n.t('Continue with Instagram')}</TextView>
      </BoxView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: Layout.borderWidth.base,
    borderColor: Layout.colors.primary,
    borderRadius: Layout.radius.round,
    padding: Layout.space.base / 2,
  },
});

export default InstagramLoginButton;