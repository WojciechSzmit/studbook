import { GLOBALTYPES } from "../actions/globalTypes";

const formStatusReducer = (state = false, action) => {
  switch (action.type) {
    case GLOBALTYPES.FORM_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default formStatusReducer;
