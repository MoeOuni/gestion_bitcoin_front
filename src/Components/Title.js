import React from "react";

const Title = ({ text }) => {
  return (
    <h4 className="mt-2">
      <span className="border-bottom border-dark pb-1">{text}</span>
    </h4>
  );
};

export default Title;
