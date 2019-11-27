import * as React from 'react';
import axios from 'axios';

export default class Signin extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    
        if (axios.defaults.headers.Authorization) {
            const errorMessage = "אתם כבר מחוברים לחשבון.";
            this.state = { errorMessage };
        } else {
            this.state = {};
        }
    }
    
    handleInputChange = (event: any) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const url = `http://localhost/user`;
        axios.post(url, this.state).then(response => {
            axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            this.props.history.push('/');
        }).catch(err => {
            this.setState({ errorMessage: "ההרשמה לא צלחה. נא נסו שנית" });
        });
    }

    render = () => {
        return <div>
            הרשמה
            {this.state.errorMessage ? <div>{this.state.errorMessage}</div> : ""}
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleInputChange} name="userName" type="text" placeholder="שם משתמש" />
                <br />
                <input onChange={this.handleInputChange} name="password" type="password" placeholder="סיסמא" />
                <br />
                <button type="submit">הרשמה</button>
            </form>
        </div>
    }
}