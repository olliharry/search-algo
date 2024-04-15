"use client";
import Grid from "./components/grid";
import React, { useState, useEffect } from "react";
import { bfs } from "./components/bfs";
import { dfs } from "./components/dfs";
import { gridInterface } from "./interfaces/gridInterface";
import styles from "./page.module.css";
export default function Home() {
  const handleCellClick = (row: number, col: number) => {
    var newWalls = gridProps.walls;
    if (gridProps.walls.some((wall) => wall.row === row && wall.col === col)) {
      newWalls.splice(newWalls.indexOf({ row, col }), 1);
    } else {
      newWalls.push({ row, col });
    }
    setGridProps((prevGridProps) => ({
      ...prevGridProps,
      walls: newWalls,
    }));
  };

  const [isSearchRunning, setIsSearchRunning] = useState(false);

  const initialGridProps: gridInterface = {
    rows: 20,
    cols: 20,
    start: { row: 0, col: 10 },
    end: { row: 19, col: 10 },
    walls: [],
    path: [],
    visited: [],
    onCellClick: handleCellClick,
  };

  const [gridProps, setGridProps] = useState<gridInterface>(initialGridProps);

  function resetClicked() {
    window.location.reload();
  }

  async function bfsClicked() {
    setIsSearchRunning(true);
    await bfs(gridProps, setGridProps);
    setIsSearchRunning(false);
  }
  async function dfsClicked() {
    setIsSearchRunning(true);
    await dfs(gridProps, setGridProps);
    setIsSearchRunning(false);
  }

  return (
    <div className={styles.container}>
      <p>Click on the cells to add walls!</p>
      <Grid {...gridProps} />
      <div className={styles.buttonContainer}>
        <button
          onClick={() => bfsClicked()}
          disabled={isSearchRunning}
          className={styles.button}
          style={{ backgroundColor: "#88de87" }}
        >
          Breadth First search
        </button>
        <button
          onClick={() => dfsClicked()}
          disabled={isSearchRunning}
          className={styles.button}
          style={{ backgroundColor: "#3d59d7" }}
        >
          Depth First search
        </button>
        <button
          onClick={() => resetClicked()}
          disabled={isSearchRunning}
          className={styles.button}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
