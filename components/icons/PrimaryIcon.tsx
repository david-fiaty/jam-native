import { StyleSheet } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import StaticIcon from '../base/StaticIcon';

type Props = {
  name: string,
};

const PrimaryIcon = ({name}: Props) => {
  return (
    <StaticIcon 
      name={name} 
      iconStyle={styles.icon} 
      containerStyle={styles.container}
      size={styles.icon.size} 
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'gray',
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 6,
    borderRadius: 40,
    alignItems: 'flex-start',
  },
  icon: {
    backgroundColor: Colors.secondary,
    padding: GlobalStyles.space/1.5,
    borderRadius: 40,
    size: GlobalStyles.tabs.icon.size/1.5,
  },
});

export default PrimaryIcon;