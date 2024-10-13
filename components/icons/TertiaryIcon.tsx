import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/GlobalStyles';
import StaticIcon from '../base/StaticIcon';

type Props = {
  name: string,
  size?: number, 
};

const TertiaryIcon = ({name, size}: Props) => {
  const iconSize = size ? size : styles.icon.size;

  return (
    <StaticIcon 
      name={name} 
      iconStyle={styles.icon} 
      containerStyle={styles.container}
      size={iconSize} 
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
    backgroundColor: Colors.tertiary,
    borderColor: Colors.tertiary,
  },
  icon: {
    color: Colors.primary,
    size: 18,
  },
});

export default TertiaryIcon;