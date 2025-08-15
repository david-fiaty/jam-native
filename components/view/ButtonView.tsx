import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import SpinnerView from '../view/SpinnerView';

type Props = {
  label?: string;
  theme?: string;
  disabled?: boolean;
  onPress?: () => void;
  isProcessing?: boolean;
  containerStyle?: any;
};

const ButtonView = ({label, theme, disabled, onPress, isProcessing, containerStyle}: Props) => {

  const themeStyles: any = {
    backgroundColor: Layout.colors[theme ? theme: 'primary'],
  };

  if (isProcessing) {
    return (
      <View style={[styles.container, containerStyle, styles.processing]}>
        <SpinnerView color="white" size="small" />
      </View>
    );
  }
  else if (disabled === true) {
    return (
      <View style={[styles.container, containerStyle, styles.disabled]}>
        <TextView style={styles.label}>{label}</TextView>
      </View>
    );
  }
  else {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle, themeStyles]}>
        <TextView style={styles.label}>{label}</TextView>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: Layout.radius.round,
    backgroundColor: Layout.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: Layout.space.base*4.3,
  },
  label: {
    color: Layout.colors.white,
    fontWeight: 'bold',
  },
  processing: {
    backgroundColor: Layout.colors.secondary,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default ButtonView;