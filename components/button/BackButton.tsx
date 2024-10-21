import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import { Layout } from '@/constants/Layout';

type Props = {
  title: string,
  onPress?: () => void,
};

const BackButton = ({title, onPress}: Props) => {
  const ButtonView = () => {
    return (        
      <View style={styles.container}>
        <IconView label="<" theme="clear" size={24} onPress={onPress} />
        <TextView>{title}</TextView>
      </View>
    );
  };

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <ButtonView />
      </TouchableOpacity>
    );
  }

  return (<ButtonView />);
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Layout.space.base,
    gap: Layout.space.base,
  },
  text: {
    fontWeight: 'bold',
  },
  icon: {
    width: 'auto',
    height: 'auto',
  },
});

export default BackButton;