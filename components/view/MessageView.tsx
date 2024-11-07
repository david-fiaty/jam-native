import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

const MessageView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        UI message
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

export default MessageView;
