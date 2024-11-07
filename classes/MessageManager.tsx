import Store from '@/redux/Store';


class MessageManager {
  timeout?: any;

  show(text: string): void {
    if (this.timeout) clearTimeout(this.timeout);
    
    Store.dispatch(setMessage(''));
    Store.dispatch(setMessage(text));

    this.timeout = setTimeout(() => Store.dispatch(setMessage('')), 5000);
  }
};

export default (new MessageManager());