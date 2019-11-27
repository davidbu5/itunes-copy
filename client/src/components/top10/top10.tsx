import * as React from 'react';
import axios from 'axios';

export default class TopTenSearches extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        if (!axios.defaults.headers.Authorization) {
            const errorMessage = "אינכם מחוברים לחשבון.";
            this.state = { errorMessage };
        } else {
            this.state = { results: [] };
            const url = `http://localhost/user/top10`;
            axios.get(url, this.state).then(response => {
                this.setState({ results: response.data })
            }).catch(err => {
                const errorMessage = "הבקשה לא צלחה. נא נסו שנית.";
                this.setState({ errorMessage });
            });
        }
    }

    render = () => {
        return <div>
            {this.state.errorMessage ? <div>{this.state.errorMessage}</div> :
                this.state.results.map((result: { _id: string, count: number }) =>
                    <div key={result._id}>"{result._id}": {result.count} חיפושים.</div>)
            }
        </div>
    }
}