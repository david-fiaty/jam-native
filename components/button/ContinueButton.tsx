import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import ButtonBase from '../base/ButtonBase';
import i18n from '@/translation/i18n';
import { Layout } from '@/constants/Layout';

type Props = {
  onPress: () => void,
};

const ContinueButton = ({onPress}: Props) => {
  return (
      <ButtonBase
        title={i18n.t('Continue')} 
        onPress={onPress} 
        containerStyle={styles.buttonContainer}
      />
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    borderRadius: Layout.radius.round,
  },
});

export default ContinueButton;