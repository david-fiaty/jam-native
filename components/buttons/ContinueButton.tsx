import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/GlobalStyles';
import { StaticButton } from '../base/StaticButton';

type Props = {
  onPress: () => void,
};

const ContinueButton = ({onPress}: Props) => {
  return (
    <StaticButton
      label="Continue" 
      onPress={onPress} 
      containerStyle={styles.container}
      labelStyle={styles.label}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  label: {
    color: '#FFFFFF',
  },
});

export default ContinueButton;