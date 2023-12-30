"use client";
import Image from "next/image";
import Grid from "./components/grid";
import React, { useState } from 'react';
import { bfs } from "./components/bfs";
import { dfs } from "./components/dfs";
import useGridProps from "./components/customHook"
export default function Home() {
  const handleCellClick = (row:number, col:number) => {
    var newWalls = gridProps.walls;
    if(gridProps.walls.some((wall) => wall.row === row && wall.col === col)){
      newWalls.splice( newWalls.indexOf({row,col}) ,1)
    }
    else{
      newWalls.push({row,col});
    }
    setGridProps((prevGridProps) => ({
     ...prevGridProps,
      walls: newWalls,
    }));
  }

  interface GridProps {
    rows: number;
    cols: number;
    start: { row: number; col: number };
    end: { row: number; col: number };
    walls: { row: number; col: number }[];
    path?: { row: number; col: number }[];
    visited: {row:number, col: number}[];
    onCellClick : (row: number, col: number) => void;
  }

  const initialGridProps: GridProps = {
    rows: 20,
    cols: 20,
    start: { row: 5, col: 10 },
    end: { row: 19, col: 10 },
    walls: [
      { row: 5, col: 8 },
    ],
    path: [{ row: 20, col: 20 }],
    visited: [],
    onCellClick: handleCellClick,
  };

  const [gridProps, setGridProps] = useState<GridProps>(initialGridProps);

  
  async function bfsClicked() {
    const result = await bfs(gridProps, setGridProps);
    console.log(result);
  }
  async function dfsClicked() {
    const result = await dfs(gridProps, setGridProps);
    console.log(result);
  }

  return (
    <div>
      <Grid {...gridProps} />
      <button onClick={() => bfsClicked()}>breadth first search</button>
      <button onClick={() => dfsClicked()}>depth first search</button>
    </div>
  );
}
