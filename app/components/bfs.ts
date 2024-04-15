import { sleep } from "./sleep";
import { gridInterface } from '../interfaces/gridInterface';

interface Point {
    visited: boolean;
    row: number;
    col: number;
    previous?: Point;
  }

var grid: Point[][];
const queue: Point[] = [];
var moveCount: number = 0;
var leftInLayer: number = 1;
var nodes_in_next_layer = 0;
var reachedEnd: boolean = false;

  export async function bfs(
    gridProps: gridInterface, 
    setGridProps: React.Dispatch<React.SetStateAction<gridInterface>>
  ): Promise<number | -1>{

    grid= Array.from({ length: gridProps.rows }, (_, row) =>
    Array<Point>(gridProps.cols)
      .fill({ visited: false, row, col: 0 })
      .map((point, col) => ({ ...point, col }))
  );

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
      exploreNeighbors(currentPoint, gridProps, setGridProps);
      leftInLayer--;
      if (leftInLayer === 0) {
        leftInLayer = nodes_in_next_layer;
        nodes_in_next_layer = 0;
        moveCount++;
      }
    }
    await sleep(15);
  }
  if (reachedEnd) {
    const path = getPath(currentPoint, gridProps, setGridProps);
    console.log("movecount : " + moveCount);
    return moveCount;
  } else {
    console.log("no path");
    return -1;
  }
  }

  const exploreNeighbors = (p: Point, gridProps:any,setGridProps:any) => {
    var newVisited = gridProps.visited;
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
      queue.push(grid[newRow][newCol]);
      nodes_in_next_layer++;
    }
  };

  const getPath = (endPoint: Point | undefined, gridProps:gridInterface, setGridProps:React.Dispatch<React.SetStateAction<gridInterface>>): Point[] => {
    const endPath: Point[] = [];
  let currentPoint: Point | undefined = endPoint;

  while (currentPoint) {
    endPath.unshift(currentPoint);
    currentPoint = currentPoint.previous;
  }
    
  const newPath = endPath.map((point) => ({ row: point.row, col: point.col }));
  setGridProps((prevGridProps: gridInterface) => ({
    ...prevGridProps,
    path: newPath,
  }));
  return endPath;
  };
  




