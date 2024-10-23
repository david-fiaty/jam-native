
const initialState = {
  tab: [],
};

const TabReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return {
        ...state,
        tab: [...state.tab, action.payload],
      };
    default:
      return state;
  }
};

export default TabReducer;