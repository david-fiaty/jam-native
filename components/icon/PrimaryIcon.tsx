import { StyleSheet, View } from 'react-native';
import IconBase from '../base/IconBase';
import { Layout } from '@/constants/Layout';
import { Colors } from '@/constants/Colors';
import TextBase from '../base/TextBase';
import TextView from '../view/TextView';

type Props = {
  name: string,
  size?: number, 
  label?: string,
  style?: object,
};

const PrimaryIcon = ({name, size, label, style}: Props) => {
  if (label) {
    return (
      <View style={styles.containerStyle}>
        <TextView style={[styles.iconStyle, {fontSize: size}]}>
          {label}
        </TextView>
      </View>
    );
  }

  return (
    <IconBase 
      name={name} 
      iconStyle={[styles.iconStyle, style]} 
      containerStyle={styles.containerStyle}
      size={size} 
    />
  );
};

const styles = StyleSheet.create({
  /*
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: GlobalStyles.space.base*3,
    height: GlobalStyles.space.base*3,
    borderRadius: GlobalStyles.space.base*1.5,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  */
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    // Todo - Enable or remove
    //marginLeft: 'auto',
    //marginRight: 'auto',
  },
  iconStyle: {
    color: '#FFFFFF',
    backgroundColor: Colors.primary,
    padding: Layout.space.small,
    borderRadius: 40,
  },
});

export default PrimaryIcon;