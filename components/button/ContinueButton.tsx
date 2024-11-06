import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';
import SpinnerView from '../view/SpinnerView';

type Props = {
  onPress: () => void,
  isProcessing: boolean,
};

const ContinueButton = ({onPress, isProcessing}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <TextView style={styles.label}>{i18n.t('Continue')}</TextView>
      <SpinnerView color="white" size="small" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: Layout.radius.round,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: Layout.space.base*4.3,
  },
  label: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default ContinueButton;