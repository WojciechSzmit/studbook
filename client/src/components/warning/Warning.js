import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingCircle from "./LoadingCircle";
import Modal from "./Modal";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

/**
 * It's a function that returns a div that contains a loading circle if the loading property of the
 * alert object in the state is true, and a modal if the error or success property of the alert object
 * in the state is true.
 * @returns A function that returns a div with a modal.
 */
export const Warning = () => {
  //useSelector((state) => console.log(state));

  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  //console.log(state);
  // const { auth, notify } = state;

  // console.log({ auth, notify });

  // return <div>{notify.loading && <h1>Wczytywanie...</h1>}</div>;
  return (
    <div>
      {alert.loading && <LoadingCircle />}
      {alert.error && (
        <Modal
          msg={{ title: "Błąd", body: alert.error }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="bg-danger"
        />
      )}

      {alert.success && (
        <Modal
          msg={{ title: "Sukces", body: alert.success }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="bg-success"
        />
      )}
    </div>
  );
};

export default Warning;
