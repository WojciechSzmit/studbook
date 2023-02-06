import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

const SharePost = ({ url, theme }) => {
  return (
    <div
      className="d-flex justify-content-between px-4 py-2"
      style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    >
      <EmailShareButton url={url}>
        <EmailIcon round={true} size={32} />
      </EmailShareButton>

      <FacebookShareButton url={url}>
        <FacebookIcon round={true} size={32} />
      </FacebookShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIcon round={true} size={32} />
      </LinkedinShareButton>
    </div>
  );
};

export default SharePost;
