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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: Layout.space.base,
  },
  content: {
    color: 'white',
  },
});

export default UserMessageView;
