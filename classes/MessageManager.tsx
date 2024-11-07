import { useDispatch, useSelector } from 'react-redux';


class MessageManager {
  show() {
    const dispatch = useDispatch();
    const messageState = useSelector((state: any) => state.message);
  }

  hide() {

  }
};

export default (new MessageManager());