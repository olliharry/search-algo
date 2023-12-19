// components/Cell.jsx
import React from "react";

const Cell = ({ state, onClick }: any) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return <button className={`cell ${state}`} onClick={handleClick} />;
};

export default Cell;
