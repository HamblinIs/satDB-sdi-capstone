import React from 'react';
import styled from 'styled-components';


export default ({value, onChange}) => {
    return (
        <>
        <input
            className='SearchBox'
            value={value}
            onChange={e => onChange && onChange(e.target.value)}
            placeholder='Satellite Search'
        />
        </>
    )
}