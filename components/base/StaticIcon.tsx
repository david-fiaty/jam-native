import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TextBlock from '@/components/base/TextBlock';

type Props = {
  name: string,
  containerStyle?: object,
  labelStyle?: object,
};

export function StaticIcon({name, containerStyle, labelStyle}: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  icon: {
    
  },
});
