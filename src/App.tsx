import * as React from 'react';
import './App.css';
const logo = require('./logo.svg');
import WelcomeScreen from "./component/welcomeScreen/welcomeScreen";

interface AppProp {
}

interface AppState {
}

export default class App extends React.Component<AppProp, AppState> {
    play = false;
    constructor(props: Readonly<AppProp>) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="App">
                <WelcomeScreen/>
            </div>
        );
    }
}
