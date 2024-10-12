import { View, StyleSheet, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TextBlock from '../base/TextBlock';

type Props = {
  title: string,
  onPress?: () => void,
};

const BackButton = ({title, onPress}: Props) => {
  const ButtonView = () => {
    return (        
      <View style={styles.container}>
        <AntDesign name="left" size={20} color={GlobalStyles.icon.color} />
        <TextBlock>{title}</TextBlock>
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
    marginBottom: 12,
    gap: GlobalStyles.gap,
  },
});

export default BackButton;