import * as React from 'react';
import SearchBox from '../searchBox/searchBox';
import SearchResults from './searchResults/searchResults';
import axios from 'axios';

export default class SearchConsole extends React.Component<any, { items?: any, queryText?: string, errorMessage?: string }> {

    constructor(props: any) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);

        const queryText = props.match.params.queryText;
        if (!queryText) {
            return;
        }

        if (!axios.defaults.headers.Authorization) {
            const errorMessage = "אינכם מחוברים לחשבון.";
            this.state = { errorMessage };
        }
        else {
            this.state = { items: [], queryText };
            this.search(queryText);
        }
    }

    handleSearch(queryText: string) {
        if (queryText === "") {
            return;
        }

        this.props.history.push(`/search/${queryText}?`);

        this.search(queryText);
    }

    async search(queryText: string) {
        const url = `http://localhost/search?queryText=${queryText.replace(' ', '+')}`;
        const response: any = await axios.get(url);

        this.setState({ items: response.data.results, queryText });
    }

    render() {
        const items = this.state ? (this.state.items || []) : [];
        return <div>
            {this.state.errorMessage ? <div>{this.state.errorMessage}</div> :
                <div>
                    <SearchBox onSearch={this.handleSearch}></SearchBox>
                    <SearchResults items={items} ></SearchResults>
                </div>}
        </div>;
    }
}