import { useState } from 'react';

const useGridProps = () => {
  const [gridProps, setGridProps] = useState({
    rows: 20,
    cols: 20,
    start: { row: 0, col: 10 },
    end: { row: 19, col: 10 },
    walls: [
      { row: 5, col: 8 },
    ],
    path: [{ row: 20, col: 20 }],
    visited: [{}],
    onCellClick: () => handleCellClick, // Provide a default function or use a placeholder
  });

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

  return [gridProps, setGridProps];
};

export default useGridProps;
