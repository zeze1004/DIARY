const initialState = {
  newDiary : {},
};

const reducers = {
  setDiary(state, { payload: { newDiary } }) {
    return {
      ...state,
      newDiary,
    };
  },
};

function defaultReducer(state) {
  return state;
}

export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
