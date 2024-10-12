
import { StyleSheet, View, Pressable } from 'react-native';
import { Button } from '@rneui/themed';

type Props = {
  props: {},
};

export function StaticButton({props}: Props) {
  return (
    <Pressable>
      <View style={styles.container}>
        <Button 
          title={props.title} 
          type={props.title}
          buttonStyle={props.buttonStyle} 
          titleStyle={props.titleStyle}
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
});
