import * as React from 'react';
import './App.css';
import GameDisplayer from "./component/GameDisplayer/GameDisplayer";
import {Game} from "./entities/game";
import {MarkerEnum} from "./entities/marker.enum";
import {GameStatus} from "./entities/game-status.enum";
import {OfflineGame} from "./entities/OfflineGame";
import AIPlayer from "./entities/AIPlayer";
import {AIGame} from "./entities/AIGame";
import HumanPlayer from "./entities/humanPlayer";
const logo = require('./logo.svg');

interface AppProp {
}

interface AppState {
    game: Game;

}

export default class App extends React.Component<AppProp, AppState> {
    play = false;
    constructor(props: Readonly<AppProp>) {
        super(props);
        const _game = new Game(new HumanPlayer(), new AIPlayer());
        _game.getPlayer1().setPlayerMarker(MarkerEnum.X);
        _game.getPlayer2().setPlayerMarker(MarkerEnum.O);
        _game.setCurrentPlayer(_game.getPlayer1());
        _game.getPlayer1().setName('Mai');
        _game.getPlayer2().setName('Trede');
        _game.setGameStatus(GameStatus.PLAYING);
        this.state = {
            game: _game
        }
    }
    render() {
        return (
            <div className="App">
                <GameDisplayer game={this.state.game}/>
            </div>
        );
    }
}
