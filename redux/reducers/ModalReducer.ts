
const initialState = {
  modal: [],
};

const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return {
        ...state,
        modal: [...state.modal, action.payload],
      };
    default:
      return state;
  }
};

export default ModalReducer;