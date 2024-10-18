import { StyleSheet } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import StaticIcon from '../base/StaticIcon';

type Props = {
  name: string,
  size?: number, 
  iconStyle?: object,
  containerStyle?: object,
};

const ClearIcon = ({name, size, iconStyle, containerStyle}: Props) => {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: GlobalStyles.space.base*1.5,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',

  },
  icon: {
    color: Colors.primary,
    size: GlobalStyles.space.base*1.5,
  },
});

export default ClearIcon;