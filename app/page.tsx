"use client";
import Image from "next/image";
import Grid from "./components/grid";
import React, { useState } from 'react';
export default function Home() {

  const handleCellClick = (row:number, col:number) => {
    console.log("psed: " + row + "  " + col);
    var newWalls = gridProps.walls;
    newWalls.push({row,col});
    setGridProps((prevGridProps) => ({
     ...prevGridProps,
      walls: newWalls,
    }));
  }
  const [gridProps, setGridProps] = useState({
    rows: 20,
    cols: 20,
    start: { row: 0, col: 10 },
    end: { row: 19, col: 10 },
    walls: [
      { row: 5, col: 8 },
    ],
    path: [{row: 20, col: 20}],
    onCellClick: handleCellClick
  });


  interface Point {
    visited: boolean;
    row: number;
    col: number;
    previous?: Point;
  }

  const grid: Point[][] = Array.from({ length: gridProps.rows }, (_, row) =>
    Array<Point>(gridProps.cols)
      .fill({ visited: false, row, col: 0 })
      .map((point, col) => ({ ...point, col }))
  );

  const queue: Point[] = [];
  var moveCount: number = 0;
  var leftInLayer: number = 1;
  var nodes_in_next_layer = 0;
  var reachedEnd: boolean = false;

  const solve = () => {
    queue.push(grid[gridProps.start.row][gridProps.start.col]);
    grid[gridProps.start.row][gridProps.start.col].visited = true;

    while (queue.length > 0) {
      var currentPoint: Point | undefined = queue.shift();
      if (currentPoint) {
        if (
          currentPoint.col === gridProps.end.col &&
          currentPoint.row === gridProps.end.row
        ) {
          reachedEnd = true;
          break;
        }
        exploreNeighbors(currentPoint);
        leftInLayer--;
        if (leftInLayer === 0) {
          leftInLayer = nodes_in_next_layer;
          nodes_in_next_layer = 0;
          moveCount++;
        }
      }
    }
    if (reachedEnd) {
      const path = getPath(currentPoint);
      console.log("movecount : " + moveCount);
      return moveCount;
    } else {
      console.log("no path");
      return -1;
    }
  };

  const exploreNeighbors = (p: Point) => {
    const directionRows = [-1, +1, 0, 0];
    const directionCols = [0, 0, +1, -1];
    var newRow: number;
    var newCol: number;
    for (var i = 0; i < 4; i++) {
      newRow = p.row + directionRows[i];
      newCol = p.col + directionCols[i];

      if (newRow < 0 || newCol < 0) {
        continue;
      }

      if (newRow >= gridProps.rows || newCol >= gridProps.cols) {
        continue;
      }

      if (grid[newRow][newCol].visited) {
        continue;
      }
      if (
        gridProps.walls.some(
          (wall) => wall.row === newRow && wall.col === newCol
        )
      ) {
        continue;
      }
      grid[newRow][newCol].previous = p;
      grid[newRow][newCol].visited = true;
      queue.push(grid[newRow][newCol]);
      nodes_in_next_layer++;
    }
  };

  const getPath = (endPoint: Point | undefined): Point[] => {
    const endPath: Point[] = [];
  let currentPoint: Point | undefined = endPoint;

  while (currentPoint) {
    endPath.unshift(currentPoint);
    currentPoint = currentPoint.previous;
  }
    
  const newPath = endPath.map((point) => ({ row: point.row, col: point.col }));
  setGridProps((prevGridProps) => ({
    ...prevGridProps,
    path: newPath,
  }));
  console.log(gridProps.path)
  return endPath;
  };

  return (
    <div>
      <Grid {...gridProps} />
      <button onClick={() => solve()}>breadth first search</button>
    </div>
  );
}
