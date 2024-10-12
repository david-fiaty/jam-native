import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import TextBlock from '../base/TextBlock';

type Props = {
  count: number,
  size?: number,
};

export function NotificationsIcon({count, size}: Props) {
  size = size ? size : GlobalStyles.icon.size;

  return (
    <View style={styles.container}>
      <TextBlock>{count}+</TextBlock>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    ...GlobalStyles.icon,
    ...GlobalStyles.text,
    ...{
      backgroundColor: Colors.tertiary,
      paddingTop: 5.5,
      paddingRight: 8,
      paddingBottom: 5.5,
      paddingLeft: 8,
      borderRadius: 40,
    },
  },
});

export default NotificationsIcon;