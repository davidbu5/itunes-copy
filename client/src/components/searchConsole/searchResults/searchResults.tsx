import * as React from 'react';
import Item from './item/item';


export default class SearchResults extends React.Component<any> {
    render() {
        return <ul>
            {this.props.items.map((item: any) =>
                <Item key={item.trackId} itunesItem={item}></Item>)}
        </ul>;
    }
}