import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import TextView from '../view/TextView';
import SpinnerView from '../view/SpinnerView';

type Props = {
  label: string,
  onPress: () => void,
  isProcessing: boolean,
};

const ButtonView = ({label, onPress, isProcessing}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      { !isProcessing && <TextView style={styles.label}>{label}</TextView> }
      { isProcessing && <SpinnerView color="white" size="small" /> }      
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

export default ButtonView;