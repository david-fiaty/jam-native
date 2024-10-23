import { combineReducers } from "redux";
import TabReducer from "./reducers/TabReducer";
import ModalReducer from "./reducers/ModalReducer";
import UserReducer from "./reducers/UserReducer";

const RootReducer = combineReducers({
  tab: TabReducer,
  modal: ModalReducer,
  user: UserReducer,
});

export default RootReducer;