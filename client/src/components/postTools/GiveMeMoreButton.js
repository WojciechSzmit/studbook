import React from "react";

const GiveMeMoreButton = ({ result, page, load, handleLoadMore }) => {
  return (
    <>
      {result < 9 * (page - 1)
        ? ""
        : !load && (
            <button
              className="btn btn-success mx-auto d-block"
              onClick={handleLoadMore}
            >
              Załaduj więcej
            </button>
          )}
    </>
  );
};

export default GiveMeMoreButton;
