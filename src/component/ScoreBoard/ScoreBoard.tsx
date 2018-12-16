import * as React from 'react';
import './ScoreBoard.css';

interface ScoreBoardProp {
}

interface ScoreBoardState {
}

export default class ScoreBoard extends React.Component<ScoreBoardProp, ScoreBoardState> {
    constructor(props: Readonly<ScoreBoardProp>) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div>
                ScoreBoard works!
            </div>
        );
    }
}
