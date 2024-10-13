import { StyleSheet } from 'react-native';
import StaticButton from '../base/StaticButton';
import { GlobalStyles } from '@/constants/GlobalStyles';

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
    padding: 0,
    paddingHorizontal: GlobalStyles.space,
  },
  label: {},
});

export default SkipButton;