import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react';
import App from './App';
import { handlers } from './new_mocks/handlers.js';
import userEvent from '@testing-library/user-event'
//import { TextEncoder } from 'util'
//Objexxt.assign(global, { TextEncoder })
import { setupServer } from 'msw/node'
//import { rest } from 'msw';
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
}),

// test('navigating to Satellite Ground Track pulls up the map', async() => {
//   render(<App/>)
//   let satViewer = screen.getByText("Satellite Ground Track")
//   await act(async() => {userEvent.click(satViewer)})
//   //await waitFor(() => screen.getByRole('img'))
//   //const satDets = screen.getByText("ATLAS CENTAUR 2")
//   expect(satViewer).toBeInTheDocument()
//   //expect(satMap).toBeInTheDocument()
// })

test('navigating to View Satellites pulls up the material', async() => {
  render(<App/>)
  let satView = screen.getByText("View Satellites")
  await act(async() => {userEvent.click(satView)})
  await waitFor(() => screen.getByText("MEAN_ANOMALY"))
  const satDets = screen.getByText("ATLAS CENTAUR 2")
  expect(satView).toBeInTheDocument()
  expect(satDets).toBeInTheDocument()
}),

test('logining in will send to appropriate destination', async() => {
  render(<App/>)
  let logInit = screen.getByText("Login")
  await act(async() => {userEvent.click(logInit)})
  let logButt = screen.getByRole('button', {name: "Login"})
  await act(async() => {userEvent.click(logButt)} )
  let logBoxes = screen.getAllByRole('textbox')
  // userEvent.type(logBoxes[0], 'ihamblin@yahoo.com')
  // userEvent.type(logBoxes[1], 'Password123')
  let eEnter = document.getElementById("username")
  userEvent.type(eEnter, 'ihamblin@yahoo.com')
  let passEnter = document.getElementById("password")
  userEvent.type(passEnter, 'Password123')
  let tes = screen.getByText("ihamblin@yahoo.com")
  let subButton = screen.getByRole('button', {name: "Submit"})
  //await act(async() => {userEvent.click(subButton)})
  const outSig = screen.getByText("Sign Out")
  expect(logInit).toBeInTheDocument()
  expect(logButt).toBeInTheDocument()
  //expect(passEnter).toBeInTheDocument()
  expect(logBoxes.length).toEqual(2)
  //expect(outSig).toBeInTheDocument()
})