import {Player} from './player';
import {Referee} from './referee';
import {GameStatus} from './game-status.enum';
import {Board} from './board';
import HumanPlayer from "./humanPlayer";
import {Position} from "./position";
import {MarkerEnum} from "./marker.enum";

export abstract class Game {
    protected board: Board = new Board();
    protected player1: Player = new HumanPlayer();
    protected player2: Player = new HumanPlayer();
    protected currentPlayer: Player = this.player1;
    protected referee: Referee = new Referee();
    protected gameStatus: GameStatus = GameStatus.PLAYING;
    protected gameID?: string;
    protected gameIndex?: number;
    protected winner: Player = new HumanPlayer();

    constructor() {
    }

    abstract tick(position: Position): void;
    abstract toString(): string;

    emptySquare(position: Position): boolean {
        return this.board.getGrid()[position.getRow()][position.getCol()].getMarker() === MarkerEnum.NONE;
    }

    getBoard(): Board {
        return this.board;
    }

    newBoard(): void {
        this.board = new Board();
    }

    setWinner(player: Player): void {
        this.winner = player;
    }

    getWinner(): Player {
        return this.winner;
    }

    setPlayer1(player: Player): void {
        this.player1 = player;
    }

    getPlayer1(): Player {
        return this.player1;
    }

    setPlayer2(player: Player): void {
        this.player2 = player;
    }

    getPlayer2(): Player {
        return this.player2;
    }

    setGameStatus(status: GameStatus): void {
        this.gameStatus = status;
    }

    getGameStatus(): GameStatus {
        return this.gameStatus;
    }

    setCurrentPlayer(player: Player): void {
        this.currentPlayer = player;
    }

    getCurrentPlayer(): Player {
        return this.currentPlayer;
    }

    setGameID(ID: string): void {
        this.gameID = ID;
    }

    getGameID(): string | undefined {
        return this.gameID;
    }

    setGameIndex(index: number): void {
        this.gameIndex = index;
    }

    getGameIndex(): number | undefined {
        return this.gameIndex;
    }

    getReferee(): Referee {
        return this.referee;
    }

}
