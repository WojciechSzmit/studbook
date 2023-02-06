import React from "react";

const Emoji = ({ setContent, content, theme }) => {
  const show_me_your_smile = [
    "👍",
    "👎",
    "🙂",
    "😀",
    "😄",
    "😆",
    "😇",
    "😈",
    "😴",
    "😪",
    "😓",
    "😢",
    "😎",
    "🤓",
    "😋",
    "🙈",
    "🙉",
    "🙊",
    "🤣",
  ];
  return (
    <div
      className="nav-item dropdown"
      /*   style={{ opacity: 1 }} */
      style={{
        opacity: 1,
        filter: theme ? "invert(1)" : "invert(0)",
      }}
    >
      <span
        className="nav-link position-relative px-1"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span
          style={{
            opacity: 0.4,
          }}
        >
          👍
        </span>
      </span>

      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <div className="show_me_your_smile">
          {show_me_your_smile.map((icon) => (
            <span key={icon} onClick={() => setContent(content + icon)}>
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Emoji;
