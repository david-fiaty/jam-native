import { StyleSheet } from 'react-native';
import { StaticButton } from '../base/StaticButton';

type Props = {
  onPress: () => void,
};

const SkipButton = ({onPress}: Props) => {
  return (
    <StaticButton
      label="Skip" 
      onPress={onPress} 
      containerStyle={styles.container}
      labelStyle={styles.label}
    />
  );
};

const styles = StyleSheet.create({
  container: {
  },
  label: {},
});

export default SkipButton;