import {Player} from './player';
import {Referee} from './referee';
import {GameStatus} from './game-status.enum';
import {Board} from './board';
import HumanPlayer from "./humanPlayer";
import {Position} from "./position";

export abstract class Game {
    protected board: Board = new Board();
    private player1: Player = new HumanPlayer();
    private player2: Player = new HumanPlayer();
    private currentPlayer: Player = this.player1;
    protected referee: Referee = new Referee();
    private gameStatus: GameStatus = GameStatus.PENDING;
    private gameID?: string;
    private gameIndex?: number;
    private winner?: Player;

    constructor() {}

    abstract tick(position: Position): void;

    getBoard(): Board {
        return this.board;
    }

    setWinner(player: Player): void {
        this.winner = player;
    }

    getWinner(): Player | undefined {
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
