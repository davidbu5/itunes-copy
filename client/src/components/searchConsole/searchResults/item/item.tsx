import * as React from 'react';
import { Link } from 'react-router-dom';

export class ItunesItem {
    trackName: string;
    trackId: string;
    artistName: string;
    kind: 'song' | 'feature-movie';
}

export interface IItemProps {
    itunesItem: ItunesItem;
}

export default class Item extends React.Component<IItemProps> {
    render() {
        return <div>
            <li>
                <Link to={{
                    pathname: `/result/${this.props.itunesItem.trackId}`,
                    state: this.props.itunesItem
                }}>
                    <div>{this.props.itunesItem.trackName}</div>
                    <div>מבצע: {this.props.itunesItem.artistName}</div>
                </Link>
            </li>
        </div>;
    }
}