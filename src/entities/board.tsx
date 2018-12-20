import {Position} from './position';
import {MarkerEnum} from "./marker.enum";
import GridSquare from "./gridSquare";

export class Board {
    private fillCount = 0;
    private grid: GridSquare[][] = [];
    private gridSize = 3;
    private maxFill = this.gridSize * this.gridSize;

    constructor() {
        this.initializeGrid();
    }

    initializeGrid(): void {
        this.grid = [];
        for (let _row = 0; _row < this.gridSize; _row++) {
            this.grid.push([]);
            for (let _col = 0; _col < this.gridSize; _col++) {
                this.grid[_row].push(new GridSquare(new Position(_row, _col)));
            }
        }
    }

    resetGame(): void {
        this.initializeGrid();
        this.fillCount = 0;
    }


    getGrid(): GridSquare[][] {
        return this.grid;
    }

    getFillCount(): number {
        return this.fillCount;
    }

    getMaxFill(): number {
        return this.maxFill;
    }

    isFull(): boolean {
        return this.fillCount === this.maxFill;
    }

    fillSquare(position: Position, marker: MarkerEnum): void {
        this.fillCount += 1;
        this.grid[position.getRow()][position.getCol()].setMarker(marker);
    }

    getMarkersBoard(): MarkerEnum[][] {
        let markerBoard: MarkerEnum[][] = [];
        for (let row = 0; row < this.gridSize; row++) {
            markerBoard.push([]);
            for (let col = 0; col < this.gridSize; col++) {
                markerBoard[row].push(this.grid[row][col].getMarker());
            }
        }
        return markerBoard;
    }

    getCol(_col: number): MarkerEnum[] {
        let col = [];
        for (let row = 0; row < this.gridSize; row++) {
            col.push(this.grid[row][_col].getMarker());
        }
        return col;
    }

    getRow(_row: number): MarkerEnum[] {
        let row = [];
        for (let col = 0; col < this.gridSize; col++) {
            row.push(this.grid[_row][col].getMarker());
        }
        return row;
    }

    getDiagonal(dir: string): MarkerEnum[] {
        const diagonal: MarkerEnum[] = [];
        switch (dir) {
            case 'left':
                for (let i = 0; i < this.gridSize; i++) {
                    diagonal.push(this.grid[i][i].getMarker());
                }
                break;
            case 'right':
                for (let i = 0; i < this.gridSize; i++) {
                    diagonal.push(this.grid[i][this.gridSize - i - 1].getMarker());
                }
                break;
            default:
                break;
        }
        return diagonal;
    }

    emptySquares(): GridSquare[] {
        const empty: GridSquare[] = [];
        this.grid.forEach(row => {
            row.forEach(square => {
                if (square.getMarker() === MarkerEnum.NONE) {
                    empty.push(square);
                }
            });
        });
        return empty;
    }
}
