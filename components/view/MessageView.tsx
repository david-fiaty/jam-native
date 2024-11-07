import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import DeviceManager from '@/classes/DeviceManager';
import IconView from './IconView';
import BoxView from './BoxView';
import { setMessage } from '@/redux/slices/MessageSlice';

const statusBarHeight: any = DeviceManager.getStatusBarSize().height;

const MessageView = () => {
  const dispatch = useDispatch();
  const messageState = useSelector((state: any) => state.message);

  if (!messageState?.text.length) return <></>;

  return (
    <BoxView direction="row" align="center" justify="space-between" style={styles.container}>
      <Text style={styles.content}>
        {messageState.text}
      </Text>
      <TouchableOpacity onPress={() => dispatch(setMessage('')) }>
        <IconView name="delete" theme="primary" />
      </TouchableOpacity>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    padding: Layout.space.base,
    marginTop: Layout.space.base + statusBarHeight,
    marginHorizontal: Layout.space.base*1.5,
    borderRadius: Layout.radius.round,
    position: 'absolute', 
    top: 0,      
    left: 0, 
    right: 0,
    zIndex: 10,
  },
  content: {
    color: 'white',
  },
});

export default MessageView;
