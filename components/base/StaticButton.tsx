
import { StyleSheet, View, Pressable } from 'react-native';
import { Button } from '@rneui/themed';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  title: string,
  type: string,
  buttonStyle: object,
  titleStyle: object,
  onPress: () => void,
};

export function StaticButton({...props}: Props) {
  console.log(props);

  return (
    <Pressable>
      <View style={styles.container}>
        <Button 
          title={props.title} 
          type={props.type}
          buttonStyle={[styles.button, props.buttonStyle]} 
          titleStyle={[styles.title, props.titleStyle]}
          onPress={props.onPress}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  button: {
    marginTop: 40,
    borderRadius: 30,
    overflow: 'hidden',
    minWidth: '35%',
    maxWidth: '40%',
    alignSelf: 'center',
  },
  title: {
    ...GlobalStyles.text,
  }
});
