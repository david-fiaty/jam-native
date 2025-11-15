import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import Constants from 'expo-constants';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';
import ImageView from '../view/ImageView';

const GoogleLoginButton = () => {
  const source: any = require('@/assets/images/google-logo.png');
  const expoConfig: any = Constants.expoConfig;

  const onPress = () => {
    // Todo - Implement google login buton
    let payload: any = {
      provider: 'google',
      authorization_code: 'AQDvlhmWEOysFyWkXsFYb5WzKw-B4p1sY7l-6QxY6vbG0FYePXVYoTvTr-PcmBgDZxPPAWxEe61LJPJ0f6Vn40A4FtyACrJs4-ce6mYKb6m9hP2BfIghno9iSP-U8MwLtKsTafDa-515WCVewp1swQFp9EJImbTr1HVvcPNFYKNMfnfS3sFsc5E76yqkWbJjm3rkScWLGj2qa5H1Re9kpdzGAXVhPtDF4wH4rJTKrgyZCaWqzpSisGy1VsS7rrLL6fGgx1yH0oOepk3Td0c1E99xM9Ofyc8ln0QOf4qgu-UBDJEd7SeKXBMSuD5BvHnCE5QO4lLlGq-hSu4tbhTu2ElHBRRrOYPsQDb3LEeZagMQHP7zQE-xJ1iFO22o21iWqCJvTXkscUQBRe_2JZbBVNWRkuzZmJXHe6lm9pxCJHYO9w',
    };

    console.log('on google button press', expoConfig?.android?.package);
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
        <TextView>{i18n.t('Continue with Google')}</TextView>
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

export default GoogleLoginButton;