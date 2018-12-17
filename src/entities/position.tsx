export class Position {
    public row: number;
    public col: number;

    constructor(_row: number, _col: number) {
        this.row = _row;
        this.col = _col;
    }

    setPosition(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    getColPosition() {
        return this.col;
    }

    getRowPosition() {
        return this.row;
    }
}
