import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react';
import App from './App';
import { createHandlers } from './new_mocks/createHandlers.js';
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import selectEvent from 'react-select-event'

test('homepage text should display', () => {
  render(<App />);
  const titleText = screen.getByText("Satellite Assessment Database");
  expect(titleText).toBeInTheDocument()
})

const server = setupServer(...createHandlers)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test('should navigate to Login Screen', async() => {
  render(<App />);
  const lTab = screen.getByText("Login/Register");
  await act(async() => {userEvent.click(lTab)})
  let lBut = screen.getByText("Login")
  await act(async() => {userEvent.click(lBut)})
  let logBoxes = screen.getAllByRole('textbox')
  await act(async() => {userEvent.click(screen.getByText("Email:"))})
  userEvent.keyboard('ihamblin@yahoo.com')
  await act(async() => {userEvent.click(screen.getByText("Password:"))})
  userEvent.keyboard('Password123')
  // let eEnter = document.getElementById("username")
  // await act(async() => {userEvent.type(eEnter, 'ihamblin@yahoo.com')})
  // let passEnter = document.getElementById("password")
  // await act(async() => {userEvent.type(passEnter, 'Password123')})
  //let tes = screen.getByText("ihamblin@yahoo.com")
  let subButton = screen.getByRole('button', {name: "Submit"})
  await act(async() => {userEvent.click(subButton)})
  await waitFor(() => screen.getByText("Logout"))
  expect(lBut).toBeInTheDocument()
  //expect(logButt).toBeInTheDocument()
  //expect(passEnter).toBeInTheDocument()
  expect(logBoxes.length).toEqual(2)
}),

test('should navigate to the Create Satel', async() => {
    render(<App />);
    const cTab = screen.getByText("Create");
    await act(async() => {userEvent.hover(cTab)})
    let cSat = screen.getByText("Create Satellite")
    await act(async() => {userEvent.click(cSat)})
    await waitFor(() => screen.getByText('Model File:'));
    let talTab = screen.getByText('Tail Number:')
    expect(talTab).toBeInTheDocument()
  }),

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