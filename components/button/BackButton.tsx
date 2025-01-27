import { StyleSheet, TouchableOpacity, View } from 'react-native';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import DeviceManager from '@/manager/DeviceManager';

type Props = {
  title?: string;
  containerStyle?: any;
  onPress?: () => void;
};

const BackButton = ({title, containerStyle, onPress}: Props) => {

  const renderTitle = () => {
    if (typeof title == 'string') {
      return <TextView style={styles.text}>{title}</TextView>;
    } 

    return title;
  };

  const ButtonView = () => {
    return (        
      <BoxView 
        direction="row" 
        align="center" 
        style={[styles.container, containerStyle]}
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

const styles = StyleSheet.create({
  container: {
    //width: DeviceManager.window.width,
    backgroundColor: 'blue',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default BackButton;