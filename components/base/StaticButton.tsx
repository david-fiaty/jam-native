
import { StyleSheet, View, Pressable } from 'react-native';
import { Button } from '@rneui/themed';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TextBlock from './TextBlock';

type Props = {
  title: string,
  type: string,
  buttonStyle: object,
  titleStyle: object,
  onPress: () => void,
};

export function StaticButton({...props}: Props) {
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.container}>
        <TextBlock>{props.title}</TextBlock>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'red',
    padding: GlobalStyles.gap,
  },
  button: {
    marginTop: 40,
    borderRadius: 30,
    overflow: 'hidden',
    minWidth: '35%',
    maxWidth: '40%',
    alignSelf: 'center',
  },
});
