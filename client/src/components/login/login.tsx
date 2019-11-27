import * as React from 'react';
import axios from 'axios';

export default class Login extends React.Component<any, any> {

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
        this.setState({errorMessage: ""});
        const url = `http://localhost/user/login`;
        axios.post(url, this.state).then(response => {
            axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            this.props.history.push('/');
        }).catch(err => {
            if (err.response.status === 400) {
                this.setState({ errorMessage: "פרטי המשתמש שהוזנו אינם נכונים. נא נסו שנית" });
            }
        });
    }

    render = () => {
        return <div>
            התחברות
            {this.state.errorMessage ? <div>{this.state.errorMessage}</div> : ""}
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleInputChange} name="userName" type="text" placeholder="שם משתמש" />
                <br />
                <input onChange={this.handleInputChange} name="password" type="password" placeholder="סיסמא" />
                <br />
                <button type="submit">התחברות</button>
            </form>
        </div>
    }
}