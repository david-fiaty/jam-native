import { TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import { BaseProps } from '@/constants/Types';

type Props = BaseProps & {
  title: string,
  titleStyle?: object,
  buttonStyle?: object,
  containerStyle?: object,
  onPress?: () => void,
};

const ButtonBase = ({title, titleStyle, buttonStyle, containerStyle, onPress}: Props) => {
  let output = (
    <Button 
      title={title} 
      titleStyle={titleStyle}
      buttonStyle={buttonStyle} 
      containerStyle={containerStyle} 
    />
  );

  if (onPress) {
    output = (
      <TouchableOpacity onPress={onPress}>
        {output}
      </TouchableOpacity>
    );
  }

  return output;
};

export default ButtonBase;