import * as React from 'react';
import './App.css';
const logo = require('./logo.svg');
import WelcomeScreen from "./component/welcomeScreen/welcomeScreen";
import Header from "./component/Footer/Header";

interface AppProp {
}

interface AppState {
}

export default class App extends React.Component<AppProp, AppState> {
    constructor(props: Readonly<AppProp>) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="App">
                <Header/>
                <WelcomeScreen/>
            </div>
        );
    }
}
