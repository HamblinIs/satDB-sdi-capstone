import React, { Component } from 'react';
import SearchResults from './SearchResults';
import SearchBox from './SearchBox';
import styled from 'styled-components';

const LowerDiv = styled.div`
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    margin-top: 3%;
    margin-left: 42%;
`


class Search extends Component {

    state = {
        searchText: ''
    }

    handleSearchChanged = (val) => {
        this.setState({searchText: val});
    }

    render() {
        const { stations, onResultClick } = this.props;

        return (
            <LowerDiv className='Search'>
                <SearchBox value={this.state.searchText} onChange={this.handleSearchChanged} />
                <SearchResults stations={stations} searchText={this.state.searchText} onResultClick={onResultClick} />
            </LowerDiv>
        )
    }
}

export default Search;