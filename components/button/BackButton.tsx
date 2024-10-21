import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import { Layout } from '@/constants/Layout';
import BoxView from '../view/BoxView';

type Props = {
  title: string,
  onPress?: () => void,
};

const BackButton = ({title, onPress}: Props) => {
  const ButtonView = () => {
    return (        
      <BoxView direction="row" align="center">
        <IconView name="previous" theme="clear" size={22} onPress={onPress} />
        <TextView>{title}</TextView>
      </BoxView>
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
    gap: Layout.space.base,
  },
});

export default BackButton;