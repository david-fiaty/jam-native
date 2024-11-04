import { StyleSheet } from 'react-native';
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
      containerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: Layout.radius.round,
  },
});

export default ContinueButton;