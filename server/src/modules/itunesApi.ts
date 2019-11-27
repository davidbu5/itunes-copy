import axios from 'axios';

export class ItunesApi {

    public static async Search(queryText: string) {
        const url = `https://itunes.apple.com/search?term=${encodeURI(queryText)}&limit=25`;
        return await axios.get(url);
    }
}