import { StyleSheet } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import ButtonBase from '../base/ButtonBase';
import i18n from '@/translation/i18n';

type Props = {
  onPress: () => void,
};

const SkipButton = ({onPress}: Props) => {
  return (
    <ButtonBase
      title={i18n.t('Skip')} 
      onPress={onPress} 
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingHorizontal: GlobalStyles.space.base,
  },
  label: {},
});

export default SkipButton;