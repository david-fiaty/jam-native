import { StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
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
      <TouchableOpacity>
        <View style={styles.containerStyle}>
          <TextView style={iconStyle}>
            {label}
          </TextView>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity>
      <IconBase 
        name={name}
        iconStyle={iconStyle} 
        containerStyle={styles.containerStyle}
        size={size} 
      />
    </TouchableOpacity>
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
    color: Colors.white,
    backgroundColor: Colors.primary,
    padding: Layout.space.small,
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
    color: Colors.white,
    backgroundColor: Colors.tertiary,
  },
  clear: {
    color: Colors.primary,
    backgroundColor: Colors.white,
  },
});