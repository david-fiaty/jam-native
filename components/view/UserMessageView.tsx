import { StyleSheet, Text, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import BoxView from './BoxView';

type Props = BaseProps & {
  content: string,
};

const UserMessageView = ({content}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'yellow',
  },
});

export default UserMessageView;
