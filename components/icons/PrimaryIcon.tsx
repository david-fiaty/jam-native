import { StyleSheet } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import StaticIcon from '../base/StaticIcon';

type Props = {
  name: string,
  size?: number, 
};

const PrimaryIcon = ({name, size}: Props) => {
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
    width: GlobalStyles.space*3,
    height: GlobalStyles.space*3,
    borderRadius: GlobalStyles.space*1.5,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  icon: {
    color: '#FFFFFF',
    size: 18,
  },
});

export default PrimaryIcon;