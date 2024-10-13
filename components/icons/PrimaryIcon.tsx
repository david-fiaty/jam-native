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
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    //borderWidth: 1,
    borderRadius: 40,
    padding: 6,
  },
  icon: {
    color: '#FFFFFF',
    size: GlobalStyles.tabs.icon.size,
  },
});

export default PrimaryIcon;