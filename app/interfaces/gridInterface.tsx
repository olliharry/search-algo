export interface gridInterface {
  rows: number;
  cols: number;
  start: { row: number; col: number };
  end: { row: number; col: number };
  walls: { row: number; col: number }[];
  path: { row: number; col: number }[];
  visited: { row: number; col: number }[];
  onCellClick: (row: number, col: number) => void;
}
