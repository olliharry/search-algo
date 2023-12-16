// components/Cell.jsx
import React from "react";

const Cell = ({ state }: any) => {
  return <div className={`cell ${state}`} />;
};

export default Cell;
