import * as React from 'react';
import './Footer.css';
import SvgIcon from '@material-ui/core/SvgIcon';
import Grid from '@material-ui/core/Grid'
import HeartIcon from '@material-ui/icons/Favorite';

interface HeaderProp {
}

interface HeaderState {
}

export default class Header extends React.Component<HeaderProp, HeaderState> {
    constructor(props: Readonly<HeaderProp>) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <Grid container={true}
                  justify={'flex-end'}>
                <Grid item={true}
                      style={{display: 'inline-flex'}}>
                    <p style={{margin: '5px'}}>Made by <a href={'https://github.com/maipham/tic-tac-toe-react/'}
                                                          style={{textDecoration: 'None'}}>Mai</a>
                    </p>
                    <HeartIcon style={{color: '#f50057'}}/>
                </Grid>
            </Grid>
        );
    }
}
