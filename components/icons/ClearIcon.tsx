import { StyleSheet } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import StaticIcon from '../base/StaticIcon';

type Props = {
  name: string,
};

const ClearIcon = ({name}: Props) => {
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
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',

  },
  icon: {
    color: Colors.primary,
    size: 18,
  },
});

export default ClearIcon;