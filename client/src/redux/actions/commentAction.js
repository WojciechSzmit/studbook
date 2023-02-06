import { GLOBALTYPES, EditData, DeleteData } from "./globalTypes";
import { POST_TYPES } from "./postAction";
import {
  postDataAPI,
  patchtDataAPI,
  deleteDataAPI,
} from "../../services/axiosRetrieveData";

import { createNotify, removeNotify } from "../actions/notifyAction";

export const createComment =
  ({ post, newComment, auth, socket }) =>
  async (dispatch) => {
    //console.log({ post, newComment, auth });
    const newPost = { ...post, comments: [...post.comments, newComment] };
    //console.log({ post, newPost });

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };
      const res = await postDataAPI("comment", data, auth.token);

      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = { ...post, comments: [...post.comments, newData] };
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
      //console.log(res);

      //SCOKET.IO
      socket.emit("createComment", newPost);

      //Notyfikacje
      const msg = {
        id: res.data.newComment._id,
        text: newComment.replay
          ? "wspomniał Cię w komentarzu." //Tutaj nie działa - nie pokazuje informacji
          : "dodał komentarz w Twoim poście.", //pokazuje tylko to
        recipients: newComment.replay ? [newComment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.reesponse.data.msg },
      });
    }
  };

export const updateComment =
  ({ comment, post, content, auth }) =>
  async (dispatch) => {
    // console.log({ comment, post, content, auth });
    const newComments = EditData(post.comments, comment._id, {
      ...comment,
      content,
    });
    const newPost = { ...post, comments: newComments };
    //console.log(newPost);

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      patchtDataAPI(`comment/${comment._id}`, { content }, auth.token);
      //console.log(res);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.reesponse.data.msg },
      });
    }
  };

export const likeComment =
  ({ comment, post, auth }) =>
  async (dispatch) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };
    const newComments = EditData(post.comments, comment._id, newComment);
    const newPost = { ...post, comments: newComments };
    //console.log(newPost);

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    //console.log({ comment, newComment });

    try {
      await patchtDataAPI(`comment/${comment._id}/like`, null, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.reesponse.data.msg },
      });
    }
  };

export const unLikeComment =
  ({ comment, post, auth }) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      likes: DeleteData(comment.likes, auth.user._id),
    };
    const newComments = EditData(post.comments, comment._id, newComment);
    const newPost = { ...post, comments: newComments };
    //console.log(newPost);

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    //console.log({ comment, newComment });

    try {
      await patchtDataAPI(`comment/${comment._id}/unlike`, null, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.reesponse.data.msg },
      });
    }
  };

export const deleteComment =
  ({ post, comment, auth, socket }) =>
  async (dispatch) => {
    // console.log({ post, comment, auth });
    const deleteArr = [
      ...post.comments.filter((com) => com.reply === comment._id),
      comment,
    ];

    const newPost = {
      ...post,
      comments: post.comments.filter(
        (com) => !deleteArr.find((da) => com._id === da._id)
      ),
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("deleteComment", newPost);
    try {
      deleteArr.forEach((item) => {
        deleteDataAPI(`comment/${item._id}`, auth.token);

        const msg = {
          id: item._id,
          text: comment.replay
            ? "wspomniał Cię w komentarzu."
            : "dodał komentarz w Twoim poście.",
          recipients: comment.replay ? [comment.tag._id] : [post.user._id],
          url: `/post/${post._id}}`,
        };

        dispatch(removeNotify({ msg, auth, socket }));
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.reesponse.data.msg },
      });
    }
  };
