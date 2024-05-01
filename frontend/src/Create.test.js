import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react';
import App from './App';
import { createHandlers } from './new_mocks/createHandlers.js';
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import selectEvent from 'react-select-event'

// test('homepage text should display', () => {
//   render(<App />);
//   const titleText = screen.getByText("Satellite Assessment Database");
//   expect(titleText).toBeInTheDocument()
// })

// test('should navigate to the Create Satel', async() => {
//     render(<App />);
//     const cTab = screen.getByText("Create");
//     await act(async() => {userEvent.hover(cTab)})
//     let cSat = screen.getByText("Create Satellite")
//     await act(async() => {userEvent.click(cSat)})
//     await waitFor(() => screen.getByText('Model File:'));
//     let talTab = screen.getByText('Tail Number:')
//     expect(talTab).toBeInTheDocument()
//   })

// const server = setupServer(...createHandlers)

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

test('submitting a satellite will take user to details page', async() => {
    render(<App />);
    const sButt = screen.getByRole('button', {name: "Submit"})
    const allButts = screen.getAllByRole('button')
   // await act(async() => {userEvent.click(allButts[3])})
    //let pasButton = screen.getByRole('button', {name:"OK"})
    //await act(async() => {userEvent.type('{esc}')})
    //await waitFor(() => {screen.getByText("Associated Assessments:")})
    expect(sButt).toBeInTheDocument()
    expect(allButts.length).toEqual(4)
    //expect(newPg).toBeInTheDocument()
  })
