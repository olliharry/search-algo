import { sleep } from "./sleep";
import { gridInterface } from '../interfaces/gridInterface';

interface Point {
    visited: boolean;
    row: number;
    col: number;
    previous?: Point;
  }

var grid: Point[][];
const stack: Point[] = [];
var reachedEnd: boolean = false;

export async function dfs(
    gridProps: gridInterface, 
    setGridProps: React.Dispatch<React.SetStateAction<gridInterface>>
  ): Promise<number | -1>{

    grid= Array.from({ length: gridProps.rows }, (_, row) =>
    Array<Point>(gridProps.cols)
      .fill({ visited: false, row, col: 0 })
      .map((point, col) => ({ ...point, col }))
  );

  stack.push(grid[gridProps.start.row][gridProps.start.col]);
  grid[gridProps.start.row][gridProps.start.col].visited = true;

  while(stack.length > 0){
    var currentPoint: Point | undefined = stack.pop();
    if(currentPoint){
        if(currentPoint?.row===gridProps.end.row&&currentPoint.col===gridProps.end.col){
            const path = getPath(currentPoint, gridProps, setGridProps);
            return 2;
        }
        exploreNeighbors(currentPoint, gridProps, setGridProps);
    }
    await sleep(20);
  }
  console.log("no work");
  return -1;
  }

  const exploreNeighbors = (p: Point, gridProps:any,setGridProps:any) => {
    var newVisited = gridProps.visited;
    const directionRows = [-1, +1, 0, 0];
    const directionCols = [0, 0, +1, -1];
    //const directionRows = [-1, +1, 0, 0];
    //const directionCols = [0, 0, +1, -1];
    var newRow: number;
    var newCol: number;
    for (var i = 0; i < 4; i++) {
      newRow = p.row + directionRows[i]
      newCol = p.col + directionCols[i]

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
          (wall:any) => wall.row === newRow && wall.col === newCol
        )
      ) {
        continue;
      }
      grid[newRow][newCol].previous = p;
      grid[newRow][newCol].visited = true;
      newVisited.push({row: newRow, col: newCol});
      setGridProps((prevGridProps:any) => ({
        ...prevGridProps,
        visited: newVisited,
      }));
      stack.push(grid[newRow][newCol]);
    }
  };

  const getPath = (endPoint: Point | undefined, gridProps:any, setGridProps:any): Point[] => {
    const endPath: Point[] = [];
  let currentPoint: Point | undefined = endPoint;

  while (currentPoint) {
    endPath.unshift(currentPoint);
    currentPoint = currentPoint.previous;
  }
    
  const newPath = endPath.map((point) => ({ row: point.row, col: point.col }));
  setGridProps((prevGridProps: any) => ({
    ...prevGridProps,
    path: newPath,
  }));
  return endPath;
  };