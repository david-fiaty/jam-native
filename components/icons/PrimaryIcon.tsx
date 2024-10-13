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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,

  },
  icon: {
    color: '#FFFFFF',
    size: 18,
  },
});

export default PrimaryIcon;