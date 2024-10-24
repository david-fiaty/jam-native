import { TouchableOpacity } from 'react-native';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
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

export default BackButton;