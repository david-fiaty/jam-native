import { TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import { BaseProps } from '@/constants/Types';
import BoxView from '../view/BoxView';

type Props = BaseProps & {
  label: string
  labelStyle?: object,
  containerStyle?: object,
  onPress?: () => void,
};

const ButtonBase = ({label, labelStyle, containerStyle, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <BoxView style={containerStyle}>
        <Button title={label} style={labelStyle} />
      </BoxView>
    </TouchableOpacity>
  );
};

export default ButtonBase;