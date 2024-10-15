import { StyleSheet } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import StaticIcon from '../base/StaticIcon';

type Props = {
  name: string,
  size?: number, 
  iconStyle?: object,
  containerStyle?: object,
};

const SecondaryIcon = ({name, size, iconStyle, containerStyle}: Props) => {
  const iconSize = size ? size : styles.icon.size;

  return (
    <StaticIcon 
      name={name} 
      iconStyle={[styles.icon, iconStyle]} 
      containerStyle={[styles.container, containerStyle]}
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
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  icon: {
    color: Colors.primary,
    size: GlobalStyles.space*1.5,
  },
});

export default SecondaryIcon;