const initialState = {
  list: [],
  failReason: {},
  currentPage: 1,
  totalPages: 0,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEWS': {
      return { ...state, loading: true };
    }

    case 'GET_NEWS_SUCCESS': {
      const { news} = action.payload;
      return { ...state, news, loading: false };
    }
    case 'GET_NEWS_FAIL': {
      const {error} = action.payload;
      return {...state, loading: false, error}
    }
    default:
      return state;
  }
};