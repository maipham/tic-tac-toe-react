import * as React from 'react';
import './App.css';
import GameDisplayer from "./component/GameDisplayer/GameDisplayer";
import {Game} from "./entities/game";
const logo = require('./logo.svg');

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <GameDisplayer game={new Game()}></GameDisplayer>
            </div>
        );
    }
}

export default App;
