import React, { useState, useEffect, useRef } from "react";
import StudentCard from "../StudentCard";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../services/axiosRetrieveData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { useHistory, useParams } from "react-router-dom";
import {
  getConversations,
  MESS_TYPES,
} from "../../redux/actions/messageAction";

const RightSideMessage = () => {
  const { auth, message, online } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchUsers(res.data.users);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch({
      type: MESS_TYPES.ADD_USER,
      payload: { ...user, text: "", media: [] },
    });
    dispatch({
      type: MESS_TYPES.CHECK_ONLINE_OFFLINE,
      payload: online,
    });
    return history.push(`/komunikator/${user._id}`);
  };

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(
      getConversations({
        auth,
      })
    );
  }, [dispatch, auth, message.firstLoad]); //załaduj wiecej

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(pageEnd.current);
  }, [setPage]);
  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(
        getConversations({
          auth,
          page,
        })
      );
    }
  }, [message.resultUsers, page, auth, dispatch]); //Online/offline

  useEffect(() => {
    if (message.firstLoad) {
      dispatch({
        type: MESS_TYPES.CHECK_ONLINE_OFFLINE,
        payload: online,
      });
    }
  }, [online, message.firstLoad, dispatch]);
  return (
    <>
      <form className="message_header" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          placeholder="Wyszukaj użytkownika..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          /* id="search" */
          style={{
            display: "none",
          }}
        >
          Wyszukaj
        </button>
      </form>

      <div className="message_chat_list">
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <StudentCard user={user} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <StudentCard user={user} msg={true}>
                  {user.online ? (
                    <i className="fa-solid fa-graduation-cap text-success" />
                  ) : (
                    auth.user.following.find(
                      (item) => item._id === user._id
                    ) && <i className="fa-solid fa-graduation-cap" />
                  )}
                </StudentCard>
              </div>
            ))}
          </>
        )}
        <button
          ref={pageEnd}
          style={{
            opacity: 0,
          }}
        >
          Załaduj więcej
        </button>
      </div>
    </>
  );
};

export default RightSideMessage;
