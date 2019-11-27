import * as React from 'react';
import SearchBox from '../searchBox/searchBox';
import SearchResults from './searchResults/searchResults';
import axios from 'axios';

interface ISearchConsoleState {
    items?: any;
    errorMessage?: string;
    isSearching?: boolean;
};

export default class SearchConsole extends React.Component<any, ISearchConsoleState> {

    constructor(props: any) {
        super(props);
        this.state = { isSearching: false };
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        if (!axios.defaults.headers.Authorization) {
            const errorMessage = "אינכם מחוברים לחשבון.";
            this.setState({ errorMessage });
        }
        else {
            const queryText = this.props.match.params.queryText;
            this.setState({ items: [], errorMessage: "" });
            if (!queryText) {
                return;
            }
            this.search(queryText);
        }
    }

    search(queryText: string) {
        if (queryText === "") {
            return;
        }

        this.props.history.push(`/search/${queryText}?`);
        this.setState({ isSearching: true, errorMessage: "" });
        const url = `http://localhost/search?queryText=${queryText.replace(' ', '+')}`;
        axios.get(url).then((response) => {
            this.setState({ items: response.data.results, isSearching: false, errorMessage: "" });
        }).catch(() => {
            const errorMessage = "חלה שגיאה בחיפוש. נא נסו שנית מאוחר יותר.";
            this.setState({ items: [], isSearching: false, errorMessage });
        });
    }

    render() {
        const items = this.state ? (this.state.items || []) : [];
        return <div>
            {!this.state.errorMessage && this.state.isSearching ?
                <div>מחפש...</div> : ""
            }
            {!this.state.isSearching &&
             this.state.items && this.state.items.length === 0 ?
                <div>לא נמצאו תוצאות.</div> : ""
            }
            {this.state.errorMessage ? <div>{this.state.errorMessage}</div> :
                <div>
                    <SearchBox onSearch={this.search}></SearchBox>
                    <SearchResults items={items} ></SearchResults>
                </div>}
        </div>;
    }
}