import * as React from 'react'; 
import { Link } from 'react-router-dom';

export class ItunesItem {
    trackName: string;
    trackId: string;
    artistName: string;
    kind: string;
}

export interface IItemProps {
    itunesItem: ItunesItem;
}

export default class Item extends React.Component<IItemProps> {
    render() {
        return <div><li><Link to={
            { 
                pathname: `/result/${this.props.itunesItem.trackId}`,
                state: this.props.itunesItem
            }
        }>{this.props.itunesItem.trackName} singer: {this.props.itunesItem.artistName}</Link></li>
    </div>;
    }
}