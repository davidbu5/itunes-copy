import axios from 'axios';

export interface IItunesResult {
    trackName: string;
    trackId: string;
    artistName: string;
    kind: string;
}

export class ItunesApi {

    public static async Search(queryText: string) {
        const encodedUrl = `https://itunes.apple.com/search?term=${encodeURI(queryText)}&limit=25`;
        const results = await axios.get(encodedUrl);
        return results;
    }
}