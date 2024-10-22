import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import { BaseProps } from '@/constants/Types';
import BoxView from '../view/BoxView';

type Props = BaseProps & {
  label: string,
  onPress?: () => void,
  style?: object,
};

const ButtonBase = ({label, onPress, style}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BoxView style={[styles.container]}>
        <Button title={label} />
      </BoxView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  element: {},
});

export default ButtonBase;