import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
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
      <TouchableOpacity onPress={() => SectionManager.pushSection('login', router)}>
        <View style={styles.containerStyle}>
          <TextView style={[styles.buttonStyle, styles.titleStyle]}>
            {i18n.t('Login') + ' / ' + i18n.t('Signup')}
          </TextView>
        </View>
      </TouchableOpacity>
      <SkipButton onPress={ async () => SectionManager.pushSection(Config.mainRoute, router)} />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: Layout.borderWidth.base, 
    borderColor: Colors.primary,
    borderRadius: 30,
    padding: Layout.space.base,
  },
  buttonStyle: {
    backgroundColor: Colors.white,
  },
  titleStyle: {
    textTransform: 'uppercase',
    color: Colors.primary,
  },
});

export default LoginSignupButton;