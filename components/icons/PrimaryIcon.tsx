import { StyleSheet } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import StaticIcon from '../base/StaticIcon';

type Props = {
  name: string,
  size?: number, 
  iconStyle?: object,
  containerStyle?: object,
};

const PrimaryIcon = ({name, size, iconStyle, containerStyle}: Props) => {
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
    width: GlobalStyles.space.base*3,
    height: GlobalStyles.space.base*3,
    borderRadius: GlobalStyles.space.base*1.5,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  icon: {
    color: '#FFFFFF',
    size: GlobalStyles.space.base*1.5,
  },
});

export default PrimaryIcon;