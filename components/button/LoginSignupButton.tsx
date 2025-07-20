import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Config } from '@/constants/Config';
import SkipButton from '../button/SkipButton';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';
import SectionManager from '@/manager/SectionManager';

const LoginSignupButton = () => {
  const router = useRouter();

  return (
    <BoxView direction="column" align="center" justify="space-between">
      <TouchableOpacity onPress={() => SectionManager.push(router, 'login')}>
        <View style={styles.containerStyle}>
          <TextView style={[styles.buttonStyle, styles.titleStyle]}>
            {i18n.t('Login') + ' / ' + i18n.t('Signup')}
          </TextView>
        </View>
      </TouchableOpacity>
      <SkipButton onPress={() => SectionManager.push(router, Config.mainSection)} />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: Layout.borderWidth.base, 
    borderColor: Layout.colors.primary,
    borderRadius: 30,
    padding: Layout.space.base,
  },
  buttonStyle: {
    backgroundColor: Layout.colors.white,
  },
  titleStyle: {
    textTransform: 'uppercase',
    color: Layout.colors.primary,
  },
});

export default LoginSignupButton;