import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Layout } from '@/constants/Layout';
import { setMessage } from '@/redux/slices/MessageSlice';
import ScreenManager from '@/manager/ScreenManager';
import IconView from './IconView';

type Props = {
  title?: string;
};

const statusBarHeight: any = ScreenManager.getStatusBarSize().height;

const MessageView = ({ title }: Props) => {
  const dispatch = useDispatch();
  const messageState = useSelector((state: any) => state.message, shallowEqual);

  if (!Object.keys(messageState).length) return <></>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {messageState?.title}
      </Text>
      <Text style={styles.content}>
        {messageState?.content}
      </Text>
      <TouchableOpacity 
        style={styles.closeIcon}
        onPress={() => dispatch(setMessage({})) } 
      >
        <IconView name="delete" theme="primary" size={18} padding={10} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    top: 0,      
    left: 0, 
    right: 0,
    zIndex: ScreenManager.getModalZIndex(),
    backgroundColor: Layout.colors.primary,
    color: Layout.colors.white,
    padding: Layout.space.base*1.6,
    marginTop: statusBarHeight,
    marginHorizontal: Layout.space.base*1.5,
    borderRadius: Layout.radius.round,
    zIndex: 1000,
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  title: {
    color: Layout.colors.white,
    fontWeight: 'bold',
    marginBottom: Layout.space.base/2,
  },
  content: {
    color: Layout.colors.white,
  },
});

export default MessageView;
