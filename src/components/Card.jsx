import React from "react";

const Card = ({ item, id, handleClick }) => {
  const classShowCard = item.isFlipped === false ? "" : "show-card";
  const classRevertCard = item.isFlipped === false ? "" : "revert-card";

  return (
    <div
      className={`d-flex card rounded ${classRevertCard}`}
      onClick={() => handleClick(id)}
    >
      <img className={`rounded ${classShowCard}`} src={item.image} alt="" />
    </div>
  );
};

export default Card;
