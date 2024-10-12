import { StyleSheet, View } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import { StaticButton } from '../base/StaticButton';

type Props = {
  onPress: () => void,
};

const ContinueButton = ({onPress}: Props) => {
  return (
    <View style={styles.container}>
      <StaticButton
        label="Continue" 
        onPress={onPress} 
        containerStyle={styles.button}
        labelStyle={styles.label}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    ...GlobalStyles.border,
    ...{
      height: 45,
      backgroundColor: Colors.primary,
      width: '100%',
    }
  },
  label: {
    color: '#FFFFFF',
  },
});

export default ContinueButton;