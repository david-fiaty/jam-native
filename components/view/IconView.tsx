import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import IconBase from '../base/IconBase';
import TextView from '../view/TextView';

type Props = {
  name?: string;
  size?: number;
  padding?: any;
  label?: string;
  theme?: string;
  radius?: string;
  iconStyle?: object;
  containerStyle?: object;
  color?: any;
  backgroundColor?: any;
  disabled?: boolean;
  onPress?: () => void;
};

const IconView = ({
  name,
  size,
  padding,
  label,
  theme,
  radius = 'circle',
  iconStyle,
  containerStyle,
  color,
  backgroundColor,
  disabled,
  onPress
}: Props) => {
  const defaultPadding: number = 2;
  const iconSize: number = size || 14;
  theme = theme || 'secondary';

  const getIconStyle = () => {
    let iconStyle: any = {
      ...styles.iconStyle,
      ...styles[theme],
      ...{
        borderRadius: Layout.radius[radius],
        padding: padding >= 0 ? padding : defaultPadding,
      },
    };

    if (backgroundColor) {
      iconStyle.backgroundColor = backgroundColor; 
    }

    if (color) {
      iconStyle.color = color; 
    }

    if (disabled) {
      iconStyle.opacity = 0.5;
    }

    return iconStyle;
  };

  const imageIcon = (
    <IconBase
      name={name}
      iconStyle={[getIconStyle(), iconStyle]}
      containerStyle={[styles.containerStyle, containerStyle]}
      size={iconSize}
    />
  );

  const textIcon = (
    <View style={styles.containerStyle}>
      <TextView style={[getIconStyle(), { fontSize: size }]}>
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
    color: Layout.colors.white,
    backgroundColor: Layout.colors.primary,
    borderRadius: Layout.radius.circle,
  },
  primary: {
    color: Layout.colors.white,
    backgroundColor: Layout.colors.primary,
  },
  secondary: {
    color: Layout.colors.primary,
    backgroundColor: Layout.colors.secondary,
  },
  tertiary: {
    color: Layout.colors.primary,
    backgroundColor: Layout.colors.tertiary,
  },
  clear: {
    color: Layout.colors.primary,
    backgroundColor: Layout.colors.white,
  },
  transparent: {
    color: Layout.colors.primary,
    backgroundColor: 'transparent',
  },
});

export default IconView;