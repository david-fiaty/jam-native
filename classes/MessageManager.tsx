import Store from '@/redux/Store';
import { setMessage } from '@/redux/slices/MessageSlice';

class MessageManager {
  show(text: string): void {
    Store.dispatch(setMessage(''));
    Store.dispatch(setMessage(text));
    setTimeout(() => Store.dispatch(setMessage('')), 5000);
  }
};

export default (new MessageManager());