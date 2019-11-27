import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component<any> {
    
    render() {
        return <header>
            <ul>
                <li><Link to="/">חיפוש</Link></li>
                <li><Link to="/signin">הרשמה</Link></li>
                <li><Link to="/login">התחברות</Link></li>
                <li><Link to="/logout">התנתקות</Link></li>
                <li><Link to="/top10">עשר החיפושים המובילים שלי</Link></li>
            </ul>
        </header>
    }
}