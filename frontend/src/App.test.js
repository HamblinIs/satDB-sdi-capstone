import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react';
import App from './App';
import { handlers } from './new_mocks/handlers.js';
import userEvent from '@testing-library/user-event'
import { TextEncoder } from 'node:util'
//Objexxt.assign(global, { TextEncoder })
import { setupServer } from 'msw/node'
import { rest } from 'msw';
import selectEvent from 'react-select-event'

// test('pulls up homepage of the site', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/center/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('homepage text should display', () => {
  render(<App />);
  const titleText = screen.getByText("Satellite Assessment Center");
  expect(titleText).toBeInTheDocument()
})

test('tabs should be available', () => {
  render(<App />);
  const tabText = screen.getByText("Login");
  //let loginSearch = screen.getByRole('button', {name: 'Login'});
  expect(tabText).toBeInTheDocument()
})


const server = setupServer(...handlers
    // rest.get(`http://localhost:8080/satellites?name=asc`, (req, res, ctx) => {
    //     return res(ctx.json(  [
    //         {
    //             "id": 1,
    //             "name": "ASCENT",
    //             "orbit": "LEO",
    //             "owner": "AFRL",
    //             "tail_num": 17245
    //         }
    //     ])
    //   )})
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('search bar should be present and return data', async() => {
  render(<App />);
  let satSearch = screen.getByRole('button', {name: 'Search'})
  let filt = document.getElementById("search_category")
  await act(async() => {userEvent.click(filt)})
  let opts = screen.getAllByRole('option')
  await act(async() => {userEvent.click(opts[1])})
  userEvent.type(screen.getByRole('textbox'), 'asc')
  await act(async() => {userEvent.click(satSearch)})
  //render(<App/>)
  //await waitFor(() => screen.getByText('AFRL'));
  //const satName = screen.getByText("ASCENT")
  expect(satSearch).toBeInTheDocument()
  expect(filt).toBeInTheDocument()
  expect(screen.getByRole('textbox')).toHaveValue('asc')
  //expect(satName).toBeInTheDocument()
})