import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import DeviceManager from '@/classes/DeviceManager';

const statusBarHeight = DeviceManager.getStatusBarSize().height;

const MessageView = () => {
  const messageState = useSelector((state: any) => state.message);

  if (!messageState?.text.length) return <></>;

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        {messageState.text}
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
    marginTop: Layout.space.base + statusBarHeight,
  },
  content: {
    color: 'white',
  },
});

export default MessageView;
