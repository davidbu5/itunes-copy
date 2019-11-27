import * as React from 'react';
import axios from 'axios';

export default class Logout extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        if (!axios.defaults.headers.Authorization) {
            const errorMessage = "אינכם מחוברים לחשבון.";
            this.state = { errorMessage };
        } else {
            this.state = {};
            const url = `http://localhost/user/logout`;
            axios.post(url, this.state).then(response => {
                delete axios.defaults.headers.Authorization;
                this.props.history.push('/');
            }).catch(err => {
                const errorMessage = "ההתנקות לא צלחה. נא נסו שנית.";
                this.setState({ errorMessage });
            });
        }
    }

    render = () => {
        return <div>
            {this.state.errorMessage ? <div>{this.state.errorMessage}</div> : <div>מתנתק...</div>}
        </div>
    }
}