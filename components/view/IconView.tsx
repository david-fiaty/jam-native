import { StyleSheet, TouchableOpacity, View } from 'react-native';
import IconBase from '../base/IconBase';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import TextView from '../view/TextView';
import { BaseProps } from '@/constants/Types';

type Props = BaseProps & {
  name?: string,
  size?: number, 
  label?: string,
  theme: string,
  radius?: string, 
  iconStyle?: object,
  containerStyle?: object,
  onPress?: () => void,
};

const IconView = ({name, size, label, theme, radius = 'circle', iconStyle, containerStyle, onPress}: Props) => {
  // Icon style
  const themeIconStyle = [styles.iconStyle, styles[theme], {borderRadius: Layout.radius[radius]}];

  // Image icon
  const imageIcon = (
    <IconBase 
      name={name}
      iconStyle={[themeIconStyle, iconStyle]} 
      containerStyle={[styles.containerStyle, containerStyle]}
      size={size || Layout.iconSize.base} 
    />
  ); 

  // Text icon
  const textIcon = (
    <View style={styles.containerStyle}>
      <TextView style={[themeIconStyle, {fontSize: size}]}>
        {label}
      </TextView>
    </View>
  );

  // Output
  let output = label ? textIcon : imageIcon;

  // Press event
  if (onPress) {
    output = (
      <TouchableOpacity onPress={onPress}>
        {output}
      </TouchableOpacity>
    );
  }

  return output;
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  iconStyle: {
    color: Colors.white,
    backgroundColor: Colors.primary,
    padding: Layout.space.base*0.65,
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