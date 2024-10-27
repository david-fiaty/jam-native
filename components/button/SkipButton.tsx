import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import ButtonBase from '../base/ButtonBase';
import i18n from '@/translation/i18n';

type Props = {
  onPress: () => {},
};

const SkipButton = ({onPress}: Props) => {
  const router = useRouter();
  onPress = onPress ? onPress : router.push('/login');

  return (
    <ButtonBase
      title={i18n.t('Skip')} 
      titleStyle={styles.titleStyle}
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.containerStyle}
      onPress={onPress} 
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1, 
    borderColor: Colors.primary,
    borderRadius: 30,
  },
  buttonStyle: {
    backgroundColor: Colors.white,
  },
  titleStyle: {
    textTransform: 'uppercase',
    color: Colors.primary,
  },
});

export default SkipButton;