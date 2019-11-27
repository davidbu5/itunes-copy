import * as React from 'react';
import { ItunesItem } from '../searchConsole/searchResults/item/item';

export default class Result extends React.Component<any, ItunesItem> {

    render = () => {
        return <div>
            <button>{this.props.location.state.collectionViewUrl}</button>
            {this.props.location.state.trackName}
            {this.props.location.state.artistName}
        </div>
    }
}