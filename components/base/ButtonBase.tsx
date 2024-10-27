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
  return (
    <Button 
      title={title} 
      titleStyle={titleStyle}
      buttonStyle={buttonStyle} 
      containerStyle={containerStyle} 
      onPress={onPress}
    />
  );
};

export default ButtonBase;