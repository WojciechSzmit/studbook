import React, {
  useState,
  /* useEffect */
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../services/axiosRetrieveData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import StudentCard from "../StudentCard";
import LoadIcon from "../../images/gear.gif";

const HeaderSearch = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  /*  useEffect(() => {
    if (search ) {
      //naprawione - była rozbieżność w pisowni authorisation w auth.js i axiosRetrieveData.js
      getDataAPI(`search?username=${search}`, auth.token)
        .then((res) =>
          // console.log(res)
          setUsers(res.data.users)
        )
        .catch((err) => {
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
          });
        });
    } else {
      setUsers([]);
    }
  }, [search, auth.token, dispatch]); */

  const handleSearch = async (e) => {
    e.preventDefault();
    /* zapobiega odświeżaniu strony po nacisnieciu buttona */

    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="search_form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        value={search}
        id="search"
        title="Wyszukaj"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
      />
      <div
        className="search_icon"
        style={{
          opacity: search ? 0 : 0.3,
        }}
      >
        <span className="material-icons">person_search </span>
        <span className="wyszukaj">Wyszukaj</span>
      </div>
      <div
        className="close_search"
        onClick={handleClose}
        style={{
          opacity: users.length === 0 ? 0 : 1,
        }}
      >
        &times;
      </div>

      <button
        type="submit"
        style={{
          display: "none",
        }}
      >
        Wyszukaj
      </button>

      {load && <img className="loading" src={LoadIcon} alt="loading" />}

      <div className="users">
        {search &&
          users.map(
            (
              user // <Link to={`/profile/${user._id}`}>
            ) => (
              <StudentCard
                key={user._id}
                user={user}
                border="border"
                handleClose={handleClose}
              />
            ) //   </Link>
          )}
      </div>
    </form>
  );
};

export default HeaderSearch;
