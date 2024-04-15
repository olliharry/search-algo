// components/Grid.jsx
import React from 'react';
import Cell from './cell';
import { gridInterface } from '../interfaces/gridInterface';

const Grid: React.FC<gridInterface> = ({ rows, cols, start, end, walls, path, onCellClick, visited }:any) => {
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
      if (Array.isArray(path) && path.some((paths: any) => paths.row === row && paths.col === col)) {
        return 'path';
      }
      if (Array.isArray(visited) && visited.some((visits: any) => visits.row === row && visits.col === col)) {
        return 'visited';
      }
      
    };
      
    return (
      <div className="grid">
        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="gridRow">
            {Array.from({ length: cols }, (_, col) => (
              <Cell key={`${row}-${col}`} 
              state={determineCellState(row, col)} 
              onClick={() => onCellClick(row,col)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  export default Grid;