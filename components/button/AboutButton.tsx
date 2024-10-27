import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';

const AboutButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push('/about')}>
      <View style={styles.containerStyle}>
        <TextView style={[styles.buttonStyle, styles.titleStyle]}>
          {i18n.t('About')}
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

export default AboutButton;