
import * as React from 'react';
import './PlayerInfoDisplayer.css';

interface PlayerInfoDisplayerProp {
}

interface PlayerInfoDisplayerState {
}

export default class PlayerInfoDisplayer extends React.Component<PlayerInfoDisplayerProp, PlayerInfoDisplayerState> {
    constructor(props: Readonly<PlayerInfoDisplayerProp>) {
        super(props);
        this.state = {
        };
    };
    render() {
        return (
            <div>
            PlayerInfoDisplayer works!
            </div>
        );
    }
}
