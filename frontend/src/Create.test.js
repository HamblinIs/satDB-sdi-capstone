import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react';
import App from './App';
import { createHandlers } from './new_mocks/handlers.js';
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import selectEvent from 'react-select-event'

test('homepage text should display', () => {
  render(<App />);
  const titleText = screen.getByText("Satellite Assessment Database");
  expect(titleText).toBeInTheDocument()
})

test('homepage text should display', async() => {
    render(<App />);
    const cTab = screen.getByText("Create");
    await act(async() => {userEvent.hover(cTab)})
    let cSat = screen.getByText("Create Satellite")
    await act(async() => {userEvent.click(cSat)})
    await waitFor(() => screen.getByText('Simulation File:'));
    let talTab = screen.getByText('Tail Number:')
    expect(talTab).toBeInTheDocument()
  })

const server = setupServer(...createHandlers)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('homepage text should display', async() => {
    render(<App />);
    const sButt = screen.getByRole('button', {name: Submit})
    expect(sButt).toBeInTheDocument()
  })