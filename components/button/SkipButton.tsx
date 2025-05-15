import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { Config } from '@/constants/Config';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';
import SectionManager from '@/manager/SectionManager';

type Props = {
  onPress: any,
};

const SkipButton = ({onPress}: Props) => {
  const router = useRouter();
  onPress = onPress ? onPress : SectionManager.push(router, Config.mainSection);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.containerStyle}>
        <TextView style={[styles.buttonStyle, styles.titleStyle]}>
          {i18n.t('Skip')}
        </TextView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderColor: Layout.colors.primary,
  },
  buttonStyle: {
    backgroundColor: Layout.colors.white,
    padding: 0,
  },
  titleStyle: {
    color: Layout.colors.primary,
  },
});

export default SkipButton;