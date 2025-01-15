import { StyleSheet, TouchableOpacity } from 'react-native';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import BoxView from '../view/BoxView';
import { Layout } from '@/constants/Layout';

type Props = {
  title: string,
  onPress?: () => void,
};

const BackButton = ({title, onPress}: Props) => {
  const ButtonView = () => {
    return (        
      <BoxView direction="row" align="center" style={styles.container}>
        <IconView 
          name="previous" 
          theme="clear" 
          padding={0} 
          onPress={onPress} 
        />
        <TextView style={styles.text}>{title}</TextView>
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
    marginBottom: Layout.space.base,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default BackButton;