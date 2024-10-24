import { StyleSheet, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from '../view/TextView';

type Props = BaseProps & {
  item?: object,
};

const NotificationScreen = ({item}: Props) => {
  
  console.log(item);

  return (
    <View style={styles.container}>
      <TextView>Search menu</TextView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default NotificationScreen;