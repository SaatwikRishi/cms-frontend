import { render } from '@testing-library/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import HomePage from '..'
import { DataContext } from '../../../context/DataContext'
import { makeRequest } from '../../../utils/makeRequest'
// Mock make request
jest.mock('../../../utils/makeRequest', () => ({
  makeRequest: jest.fn()
}))

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

describe('Tests for HomePage', () => {
  it('should render the HomePage', () => {
    const nav = jest.fn()
    useNavigate.mockReturnValue(nav)

    makeRequest.mockResolvedValue({ data: { data: [] } })

    const { getByTestId } = render(
      <DataContext.Provider value={{
        getCollections: jest.fn(),
        collections: [
          {
            id: '1',
            name: 'Test'

          }
        ]
      }} >
        <HomePage />
      </DataContext.Provider>
    )
    expect(getByTestId('home-page')).toBeTruthy()
  })
})
