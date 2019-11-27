import * as React from 'react';
import SearchBox from '../searchBox/searchBox';
import axios from 'axios';

export default class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);

        if (!axios.defaults.headers.Authorization) {
            const errorMessage = "אינכם מחוברים לחשבון. יש להתחבר לחשבון אם ברצונכם לחפש.";
            this.state = { errorMessage };
        } else {
            this.state = {};
        }
    }

    async handleSearch(queryText: string) {
        if (queryText === "") {
            return;
        }

        this.props.history.push(`/search/${queryText}`);
    }

    render() {
        return <div>
            {this.state.errorMessage ? <div>{this.state.errorMessage}</div> :
                <SearchBox onSearch={this.handleSearch}></SearchBox>}
        </div>;
    }
}