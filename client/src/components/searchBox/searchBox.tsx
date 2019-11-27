import * as React from 'react';

export default class SearchBox extends React.Component<any, { input: string }> {
    constructor(props: any) {
        super(props)
        this.state = { input: '' }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleTextboxChange = this.handleTextboxChange.bind(this);
    }

    handleSearch(event: React.FormEvent) {
        event.preventDefault();
        this.props.onSearch(this.state.input)
    }

    handleTextboxChange(event: any) {
        this.setState({ input: event.target.value });
    }

    render() {
        const input = (this.state as any).input;
        return <form onSubmit={this.handleSearch}>
            <input type="text"
                onChange={this.handleTextboxChange}
                value={input}></input>
            <button id="search-button" type="submit">חיפוש</button>
        </form>
    }
}