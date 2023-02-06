import React from "react";

const LoadingCircle = () => {
  return (
    <div
      className="position-fixed w-100 h-100 text-center loading"
      style={{
        background: "#0008",
        color: "white",
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      {/*Animacja kółka z svg */}
      <svg width="205" height="250" viewBox="0 0 49 50">
        <circle
          stroke="#fff"
          strokeWidth="1"
          fill="none"
          cx="25"
          cy="20"
          r="10"
        />
        <text fill="#fff" x="5" y="47">
          Wczytywanie...
        </text>
      </svg>
    </div>
  );
};

export default LoadingCircle;
