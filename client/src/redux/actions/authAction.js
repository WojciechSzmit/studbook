import { postDataAPI } from "../../services/axiosRetrieveData";
import { GLOBALTYPES } from "./globalTypes";
import registerValidation from "../../services/registerValidation";

/* export const TYPES = {
  AUTH: "AUTH",
};
 */
export const login = (data) => async (dispatch) => {
  try {
    // console.log(data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("login", data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.accessToken, user: res.data.user },
    });
    //console.log(res);
    localStorage.setItem("firstLogin", true);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    try {
      const res = await postDataAPI("refreshToken");
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { token: res.data.accessToken, user: res.data.user },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  }
};

export const register = (data) => async (dispatch) => {
  const check = registerValidation(data);
  if (check.errLength > 0)
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });
  // console.log(check);
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI("register", data);
    //console.log(res);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.accessToken, user: res.data.user },
    });

    localStorage.setItem("firstLogin", true);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");
    await postDataAPI("logout");
    window.location.href = "/";
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
