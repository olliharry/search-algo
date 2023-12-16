// components/Grid.jsx
import React from 'react';
import Cell from './cell';

interface GridProps {
    rows: number;
    cols: number;
    start: { row: number; col: number };
    end: { row: number; col: number };
    walls: { row: number; col: number }[];
    path: { row: number; col: number }[];
  }

const Grid: React.FC<GridProps> = ({ rows, cols, start, end, walls, path }:any) => {
    const determineCellState = (row:number, col:number) => {
      if(row === start.row && col === start.col){
        return 'start';
      }
      if (row === end.row && col === end.col) {
        return 'end';
      }
      const isWall = walls.some((wall:any) => wall.row === row && wall.col === col);
    if (isWall) {
      return 'wall';
    }
    };
  
    return (
      <div className="grid">
        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="gridRow">
            {Array.from({ length: cols }, (_, col) => (
              <Cell key={`${row}-${col}`} state={determineCellState(row, col)} />
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  export default Grid;