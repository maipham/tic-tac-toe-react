import * as React from 'react';
import './App.css';
import Game from './component/Game/Game'
const logo = require('./logo.svg');

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Game></Game>
            </div>
        );
    }
}

export default App;
