import { StyleSheet, TouchableOpacity, View } from 'react-native';
import IconBase from '../base/IconBase';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import TextView from '../view/TextView';

type Props = {
  name?: string;
  size?: number; 
  padding?: any;
  label?: string;
  theme: string;
  radius?: string; 
  iconStyle?: object;
  containerStyle?: object;
  onPress?: () => void;
};

const IconView = ({name, size, padding, label, theme, radius = 'circle', iconStyle, containerStyle, onPress}: Props) => {
  const defaultPadding: number = 2;
  const iconSize: number = size || 14;

  const themeIconStyle = [
    styles.iconStyle, 
    styles[theme], 
    { 
      borderRadius: Layout.radius[radius],
      padding: padding >= 0 ? padding : defaultPadding,
    },
  ];

  const imageIcon = (
    <IconBase 
      name={name}
      iconStyle={[themeIconStyle, iconStyle]} 
      containerStyle={[styles.containerStyle, containerStyle]}
      size={iconSize} 
    />
  ); 

  const textIcon = (
    <View style={styles.containerStyle}>
      <TextView style={[themeIconStyle, {fontSize: size}]}>
        {label}
      </TextView>
    </View>
  );

  let output = label ? textIcon : imageIcon;

  if (onPress) {
    output = (
      <TouchableOpacity onPress={onPress}>
        {output}
      </TouchableOpacity>
    );
  }

  return output;
};

const styles: any = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: Colors.white,
    backgroundColor: Colors.primary,
    borderRadius: Layout.radius.circle,
  },
  primary: {
    color: Colors.white,
    backgroundColor: Colors.primary,
  },
  secondary: {
    color: Colors.primary,
    backgroundColor: Colors.secondary,
  },
  tertiary: {
    color: Colors.primary,
    backgroundColor: Colors.tertiary,
  },
  clear: {
    color: Colors.primary,
    backgroundColor: Colors.white,
  },
  transparent: {
    color: Colors.primary,
    backgroundColor: 'transparent',
  },
});

export default IconView;