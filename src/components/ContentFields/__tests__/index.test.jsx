// Create tests for content fields file

import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import ContentFields from '..'
import { DataContext } from '../../../context/DataContext'
import { makeRequest } from '../../../utils/makeRequest'

jest.mock('../../../utils/makeRequest', () => ({
  makeRequest: jest.fn()
}))

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

describe('Tests for ContentFields', () => {
  it('should render the ContentFields', () => {
    const nav = jest.fn()
    useNavigate.mockReturnValue(nav)

    makeRequest.mockResolvedValue({ data: { data: [] } })

    const { getByText } = render(
        <DataContext.Provider value={{
          getCollections: jest.fn(),
          collections: [
            {
              id: 1,
              name: 'Test'

            }
          ]
        }} >
            <ContentFields id={1} />
        </DataContext.Provider>
    )
    expect(getByText('Test')).toBeTruthy()
  })
  it('should open the dialog and enter some data', () => {
    const nav = jest.fn()
    useNavigate.mockReturnValue(nav)

    makeRequest.mockResolvedValue({ data: { data: [] } })

    const { getByTestId } = render(
        <DataContext.Provider value={{
          getCollections: jest.fn(),
          collections: [
            {
              id: 1,
              name: 'Test'

            }
          ]
        }} >
            <ContentFields id={1} />
        </DataContext.Provider>
    )
    const addFieldBtn = getByTestId('add-field-btn')
    fireEvent.click(getByTestId('add-field-btn'))
    expect(screen.getByTestId('dialog-box')).toBeTruthy()
  })

  it('should open the dialog and call handleDialogSuccess', () => {
    const nav = jest.fn()
    useNavigate.mockReturnValue(nav)

    makeRequest.mockResolvedValue({ data: { data: [] } })

    const { getByTestId } = render(
        <DataContext.Provider value={{
          getCollections: jest.fn(),
          collections: [
            {
              id: 1,
              name: 'Test'
            }
          ]
        }} >
            <ContentFields id={1} />
        </DataContext.Provider>
    )
    fireEvent.click(getByTestId('add-field-btn'))
    fireEvent.change(getByTestId('content-type-input'), { target: { value: 'Test' } })
    fireEvent.click(getByTestId('custom-button'))
  })
  it('should open the dialog and edit the collection', () => {
    const nav = jest.fn()
    useNavigate.mockReturnValue(nav)

    makeRequest.mockResolvedValue({
      data: {
        data: {
          id: 1,
          name: 'Test'
        }
      }
    })

    const { getByTestId } = render(
        <DataContext.Provider value={{
          enableSnackBar: jest.fn(),
          getCollections: jest.fn(),
          collections: [
            {
              id: 1,
              name: 'Test'

            }
          ]
        }} >
            <ContentFields id={1} />
        </DataContext.Provider>
    )
    fireEvent.click(getByTestId('edit-collection'))
    fireEvent.change(getByTestId('content-type-input'), { target: { value: 'Test' } })
    fireEvent.click(getByTestId('custom-button'))
  })
  it('should navigate to error page when useEffect has error', async () => {
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)

    makeRequest.mockRejectedValue({})

    const { getByTestId } = render(
        <DataContext.Provider value={{
          enableSnackBar: jest.fn(),
          getCollections: jest.fn(),
          collections: [
            {
              id: 1,
              name: 'Test'

            }
          ]
        }} >
            <ContentFields id={1} />
        </DataContext.Provider>
    )
    await waitFor(() => {
      expect(navigate).toBeCalledWith('/error')
    })
  })
  it('should render some fields', () => {
    const nav = jest.fn()
    useNavigate.mockReturnValue(nav)

    makeRequest.mockResolvedValue({
      data: {
        data: [
          {
            id: 1,
            name: 'Test'
          }
        ]
      }
    })

    const { getByTestId } = render(
        <DataContext.Provider value={{
          getCollections: jest.fn(),
          collections: [
            {
              id: 1,
              name: 'BOX'

            }
          ]
        }} >
            <ContentFields id={1} />
        </DataContext.Provider>
    )
    expect(screen.getByText('BOX')).toBeTruthy()
  })
})
