import React, { Component } from 'react';
import styled from 'styled-components';

const LowerDiv = styled.div`
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    margin-top: 5%;
    margin-left: 40%;
`
const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
`
class Info extends Component {
    render() {
        const p = this.props;
        const { stations, refMode } = p;

        return (
            <CenterDiv>
            <LowerDiv className='Info'>
                <h1>Satellite tracker</h1>
                {/* {stations && stations.length > 0 && (<p>Total objects: {stations.length}</p>)}
                {refMode == 1 ? <p>ECF mode</p> : <p>ECI mode</p>} */}
            </LowerDiv>
            </CenterDiv>
        )
    }
}

export default Info;