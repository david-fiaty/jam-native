import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import TextView from '../view/TextView';
import SpinnerView from '../view/SpinnerView';

type Props = {
  label?: string;
  disabled?: boolean;
  onPress?: () => void;
  isProcessing?: boolean;
};

const ButtonView = ({label, disabled, onPress, isProcessing}: Props) => {
  if (isProcessing) {
    return (
      <View style={[styles.container, styles.processing]}>
        <SpinnerView color="white" size="small" />
      </View>
    );
  }
  else if (disabled === true) {
    return (
      <View style={[styles.container, styles.disabled]}>
        <TextView style={styles.label}>{label}</TextView>
      </View>
    );
  }
  else {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <TextView style={styles.label}>{label}</TextView>
      </TouchableOpacity>
    );
  }
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
  processing: {
    backgroundColor: Colors.secondary,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default ButtonView;