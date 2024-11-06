import { StyleSheet, Text } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

type Props = BaseProps & {
  content: string,
};

const UserMessageView = ({content}: Props) => {
  return (
    <Text style={styles.content}>
      {content}
    </Text>
  );
};

const styles = StyleSheet.create({
  content: {
    color: Colors.primary,
    fontSize: Layout.fontSize.base,
  },
});

export default UserMessageView;
