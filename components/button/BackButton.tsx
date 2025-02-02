import { TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';

type Props = {
  title?: string;
  containerStyle?: any;
  onPress?: () => void;
};

const BackButton = ({title, containerStyle, onPress}: Props) => {
  const renderTitle = () => {
    if (typeof title == 'string') {
      return <TextView style={Layout.title}>{title}</TextView>;
    } 

    return title;
  };

  const ButtonView = () => {
    return (        
      <BoxView 
        direction="row" 
        align="center" 
        style={[Layout.title, containerStyle]}
      >
        <IconView 
          name="previous" 
          theme="clear" 
          padding={0} 
          onPress={onPress} 
        />

        {renderTitle()}
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

  return <ButtonView />;
};

export default BackButton;