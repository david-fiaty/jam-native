import { View, StyleSheet, Pressable } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TextBlock from '@/components/base/TextBlock';
import ClearIcon from '../icons/ClearIcon';

type Props = {
  title: string,
  onPress?: () => void,
};

const BackButton = ({title, onPress}: Props) => {
  const ButtonView = () => {
    return (        
      <View style={styles.container}>
        <ClearIcon name="previous" />
        <TextBlock style={styles.text}>{title}</TextBlock>
      </View>
    );
  };

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        <ButtonView />
      </Pressable>
    );
  }

  return (<ButtonView />);
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: GlobalStyles.space,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default BackButton;