// import React from 'react'
// import { render, screen, act, waitFor } from '@testing-library/react';
// import App from './App';
// import { handlers } from './new_mocks/handlers.js';
// import userEvent from '@testing-library/user-event'
// //import { TextEncoder } from 'util'
// //Objexxt.assign(global, { TextEncoder })
// import { setupServer } from 'msw/node'
// //import { rest } from 'msw';
// import selectEvent from 'react-select-event'

// test('homepage text should display', () => {
//   render(<App />);
//   const titleText = screen.getByText("Satellite Assessment Database");
//   expect(titleText).toBeInTheDocument()
// })

// test('tabs should be available', () => {
//   render(<App />);
//   const tabText = screen.getByText("Celestrak Data");
//   //let loginSearch = screen.getByRole('button', {name: 'Login'});
//   expect(tabText).toBeInTheDocument()
// })


// const server = setupServer(...handlers)

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// test('search bar should be present and return data', async() => {
//   render(<App />);
//   let initSearch = screen.getByText("Search")
//   await act(async() => {userEvent.click(initSearch)})
//   let satSearch = screen.getByRole('button', {name: 'Search'})
//   let opts = screen.getAllByRole('radio')
//   await act(async() => {userEvent.click(opts[0])})
//   userEvent.type(screen.getByRole('textbox'), 'asc')
//   await act(async() => {userEvent.click(satSearch)})
//   await waitFor(() => screen.getByText('AFRL'));
//   const satName = screen.getByText("ASCENT")
//   expect(satSearch).toBeInTheDocument()
//   expect(screen.getByRole('textbox')).toHaveValue('asc')
//   expect(satName).toBeInTheDocument()
//   //expect(opts.length).toEqual(2)
// }),

// // // test('navigating to Satellite Ground Track pulls up the map', async() => {
// // //   render(<App/>)
// // //   let satViewer = screen.getByText("Satellite Ground Track")
// // //   await act(async() => {userEvent.click(satViewer)})
// // //   //await waitFor(() => screen.getByRole('img'))
// // //   //const satDets = screen.getByText("ATLAS CENTAUR 2")
// // //   expect(satViewer).toBeInTheDocument()
// // //   //expect(satMap).toBeInTheDocument()
// // // })

// test('navigating to View Satellites pulls up the material', async() => {
//   render(<App/>)
//   let satView = screen.getByText("Celestrak Data")
//   await act(async() => {userEvent.click(satView)})

//   await waitFor(() => screen.getByText("epoch"))

//   await waitFor(() => screen.getByText("Line 1"))
//   const satDets = screen.getByText("ATLAS CENTAUR 2")
//   expect(satView).toBeInTheDocument()
//   expect(satDets).toBeInTheDocument()
// })

// test('logining in will send to appropriate destination', async() => {
//   render(<App/>)
//   let logInit = screen.getByText("Login/Register")
//   await act(async() => {userEvent.click(logInit)})
//   let logButt = screen.getByRole('button', {name: "Login"})
//   await act(async() => {userEvent.click(logButt)} )
//   let logBoxes = screen.getAllByRole('textbox')
//   await act(async() => {userEvent.click(screen.getByText("Email:"))})
//   userEvent.keyboard('ihamblin@yahoo.com')
//   await act(async() => {userEvent.click(screen.getByText("Password:"))})
//   userEvent.keyboard('Password123')
//   // let eEnter = document.getElementById("username")
//   // await act(async() => {userEvent.type(eEnter, 'ihamblin@yahoo.com')})
//   // let passEnter = document.getElementById("password")
//   // await act(async() => {userEvent.type(passEnter, 'Password123')})
//   //let tes = screen.getByText("ihamblin@yahoo.com")
//   let subButton = screen.getByRole('button', {name: "Submit"})
//   // await act(async() => {userEvent.click(subButton)})
//   // await waitFor(() => screen.getByText("Logout"))
//   expect(logInit).toBeInTheDocument()
//   expect(logButt).toBeInTheDocument()
//   //expect(passEnter).toBeInTheDocument()
//   expect(logBoxes.length).toEqual(2)
//   //expect(outSig).toBeInTheDocument()
// })
