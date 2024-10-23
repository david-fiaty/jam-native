
const initialState = {
  user: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return {
        ...state,
        user: [...state.user, action.payload],
      };
    default:
      return state;
  }
};

export default UserReducer;