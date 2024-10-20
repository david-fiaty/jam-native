import { StyleSheet, View } from 'react-native';
import IconBase from '../base/IconBase';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import TextView from '../view/TextView';

type Props = {
  name?: string,
  size?: number, 
  label?: string,
  theme: string,
  style?: object,
};

export default ({name, size, label, theme, style}: Props) => {
  const iconStyle = [styles.iconStyle, styles[theme], {fontSize: size}];

  if (label) {
    return (
      <View style={styles.containerStyle}>
        <TextView style={iconStyle}>
          {label}
        </TextView>
      </View>
    );
  }

  return (
    <IconBase 
      name={name}
      iconStyle={iconStyle} 
      containerStyle={styles.containerStyle}
      size={size} 
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#FFFFFF',
    backgroundColor: Colors.primary,
    padding: Layout.space.small,
    borderRadius: Layout.radius.circle,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  tertiary: {
    backgroundColor: Colors.tertiary,
  },
  clear: {
    backgroundColor: Colors.white,
  },
});