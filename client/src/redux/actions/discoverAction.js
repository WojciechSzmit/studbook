import { GLOBALTYPES } from "./globalTypes";
import { getData, getDataAPI } from "../../services/axiosRetrieveData";

export const DISCOVER_TYPES = {
  LOADING: "LOADING_DISCOVER",
  GET_POSTS: "GET_DISCOVER_POSTS",
  UPDATE_POST: "UPDATE_DISCOVER_POST",
};

export const getDiscoverPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: DISCOVER_TYPES.LOADING, payload: true });

    const res = await getDataAPI(`post_odkrywaj`, token);
    //console.log(res);
    dispatch({ type: DISCOVER_TYPES.GET_POSTS, payload: res.data });

    dispatch({ type: DISCOVER_TYPES.LOADING, payload: false });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};
