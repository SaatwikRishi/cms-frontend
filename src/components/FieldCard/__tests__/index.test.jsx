import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import FieldCard from '..'
import React from 'react'
import { DataContext } from '../../../context/DataContext'
import { makeRequest } from '../../../utils/makeRequest'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))
jest.mock('../../../utils/makeRequest', () => ({
  makeRequest: jest.fn()
}))

describe('Tests for field card', () => {
  it('should render the field card', () => {
    render(
    <DataContext.Provider value={{
      enableSnackBar: jest.fn()
    }}>
    <FieldCard field={
        {
          id: 1,
          name: 'One'
        }
    } />
   </DataContext.Provider>
    )

    expect(screen.getByText('Ab')).toBeTruthy()
  })
  it('should delete the field', async () => {
    makeRequest.mockResolvedValue({ data: { data: [] } })
    render(
    <DataContext.Provider value={{
      enableSnackBar: jest.fn()
    }}>
    <FieldCard field={
        {
          id: 1,
          name: 'One'
        }
    } />
   </DataContext.Provider>
    )
    fireEvent.click(screen.getByTestId('delete-field'))

    waitFor(() => {
      expect(screen.getByText('One')).toBeFalsy()
    })
  })
  it('should open the edit dialog and edit a field', async () => {
    makeRequest.mockResolvedValue({ data: { data: { name: 'Test' } } })
    render(
    <DataContext.Provider value={{
      enableSnackBar: jest.fn()
    }}>
    <FieldCard field={
        {
          id: 1,
          name: 'One'
        }
    } />
   </DataContext.Provider>
    )
    fireEvent.click(screen.getByTestId('edit-field'))
    fireEvent.change(screen.getByTestId('content-type-input'), { target: { value: 'Test' } })
    fireEvent.click(screen.getByTestId('custom-button'))
    await waitFor(() => {
      expect(screen.getByText('Text')).toBeTruthy()
    })
  })
})
