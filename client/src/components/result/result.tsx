import * as React from 'react';
import { ItunesItem } from '../searchConsole/searchResults/item/item';

export default class Result extends React.Component<any, ItunesItem> {

    render = () => {
        const result = this.props.location.state;
        if (result.kind === 'song') {
            return <div>
                <audio controls>
                    <source src={result.previewUrl} />>
                </audio>
                <div>שם השיר: {result.trackName}</div>
                <div>מבצע: {result.artistName}</div>
            </div>
        } else if (result.kind === 'feature-movie') {
            return <div>
                <video crossOrigin="anonymous" src={result.previewUrl} controls>
                    <source src={result.previewUrl} />>
                </video>
                <div>שם השיר: {result.trackName}</div>
                <div>מבצע: {result.artistName}</div>
            </div>
        } else {
            return <div>
                <div>לא ניתן להציג את התוצאה המבוקשת.</div>
                <div>שם השיר: {result.trackName}</div>
                <div>מבצע: {result.artistName}</div>
            </div>
        }
    }
}