import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';

const LegalButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push('/legal')}>
      <View style={styles.containerStyle}>
        <TextView style={[styles.buttonStyle, styles.titleStyle]}>
          {i18n.t('Legal')}
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

export default LegalButton;