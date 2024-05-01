import React from 'react';
import { StationCard } from '../Search/SearchResults';
import styled from 'styled-components';


const LowerDiv = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    margin-top: 30px;
    margin-right: 8%;
`
export default function({selected, onRemoveStation, onRemoveAll, onStationClick}) {
    if (!selected || selected.length === 0) return null;

    return (
        <div className='Selected'>
            <div className="SelectedHeader">
            <h2>Selected</h2>
            <p className='SmallButton' onClick={onRemoveAll}>Clear all</p>
            </div>
            {selected.map((station, i) => {
                return <StationCard
                    station={station}
                    key={station.name + i}
                    onRemoveClick={onRemoveStation}
                    onClick={onStationClick}
                />
            })}
        </div>
    )
}