import { combineReducers } from "redux";
import TabReducer from "./reducers/TabReducer";
import ModalReducer from "./reducers/ModalReducer";

const RootReducer = combineReducers({
  tab: TabReducer,
  modal: ModalReducer,
});

export default RootReducer;