import { GLOBALTYPES, DeleteData } from "./globalTypes";
import { getDataAPI, patchtDataAPI } from "../../services/axiosRetrieveData";
import { cloudinaryUpload } from "../../services/cloudinaryUpload";
import { createNotify, removeNotify } from "../actions/notifyAction";

export const PROFILE_TYPES = {
  LOADING: "LOADING_PROFILE",
  GET_USER: "GET_PROFILE_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
  GET_ID: "GET_PROFILE_ID",
  GET_POSTS: "GET_PROFILE_POSTS",
  UPDATE_POST: "UPDATE_PROFILE_POST",
};

export const getProfileUsers =
  ({ id, auth }) =>
  async (dispatch) => {
    dispatch({ type: PROFILE_TYPES.GET_ID, payload: id });

    //console.log({ users, id, auth });
    //if (users.every((user) => user._id !== id)) {

    try {
      dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
      const res = getDataAPI(`/user/${id}`, auth.token);

      const res1 = getDataAPI(`/user_posts/${id}`, auth.token);
      //console.log(res1);

      const users = await res;
      const posts = await res1;

      //console.log(res);
      dispatch({ type: PROFILE_TYPES.GET_USER, payload: users.data });

      dispatch({
        type: PROFILE_TYPES.GET_POSTS,
        payload: { ...posts.data, _id: id, page: 2 },
      });

      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
// };

export const updateProfileUser =
  ({ userData, avatar, auth }) =>
  async (dispatch) => {
    // console.log({ userData, avatar });
    if (!userData.fullname)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Dodaj swoję imię i nazwisko" },
      });

    if (userData.fullname.length > 25)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Wpisane imię i nazwisko są za ługie" },
      });

    if (userData.story.length > 200)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Twój opis jest za długi" },
      });

    try {
      let media;
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: true },
      });

      if (avatar) media = await cloudinaryUpload([avatar]);

      //console.log(media);
      const res = await patchtDataAPI(
        "user",
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );
      // console.log(res);

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.msg },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const follow =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let newUser;
    if (users.every((item) => item._id !== user._id)) {
      newUser = { ...user, followers: [...user.followers, auth.user] };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = { ...item, followers: [...item.followers, auth.user] };
        }
      });
    }
    // console.log({ users, user, auth });

    //console.log({ newUser });

    //console.log(newUser);
    dispatch({
      type: PROFILE_TYPES.FOLLOW,
      payload: newUser,
    });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });

    try {
      const res = await patchtDataAPI(
        `user/${user._id}/follow`,
        null,
        auth.token
      );

      socket.emit("follow", res.data.newUser);

      //Powiadomienia
      const msg = {
        id: auth.user._id,
        text: " zaczął Cię obserwować.",
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const unfollow =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    // console.log({ users, user, auth });

    //console.log(newUser);

    let newUser;
    if (users.every((item) => item._id !== user._id)) {
      newUser = {
        ...user,
        followers: DeleteData(user.followers, auth.user._id),
      };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = {
            ...item,
            followers: DeleteData(item.followers, auth.user._id),
          };
        }
      });
    }

    dispatch({
      type: PROFILE_TYPES.UNFOLLOW,
      payload: newUser,
    });
    //console.log(newUser);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: DeleteData(auth.user.following, newUser._id),
        },
      },
    });

    try {
      const res = await patchtDataAPI(
        `user/${user._id}/unfollow`,
        null,
        auth.token
      );

      socket.emit("unFollow", res.data.newUser);

      //Powiadomienia
      const msg = {
        id: auth.user._id,
        text: " zaczął Cię obserwować.",
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}}`,
      };

      dispatch(removeNotify({ msg, auth, socket }));
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };
