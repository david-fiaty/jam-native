import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';
import { Config } from '@/constants/Config';

type Props = {
  onPress: any,
};

const SkipButton = ({onPress}: Props) => {
  const router = useRouter();
  onPress = onPress ? onPress : router.push(Config.mainRoute);

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
    borderColor: Colors.primary,
  },
  buttonStyle: {
    backgroundColor: Colors.white,
    padding: 0,
  },
  titleStyle: {
    color: Colors.primary,
  },
});

export default SkipButton;