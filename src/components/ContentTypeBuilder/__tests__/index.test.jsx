import { fireEvent, render, screen } from '@testing-library/react'
import ContentTypeBuilder from '..'
import { DataContext } from '../../../context/DataContext'
import React from 'react'
import { makeRequest } from '../../../utils/makeRequest'
jest.mock('../../../utils/makeRequest', () => ({
  makeRequest: jest.fn()
})
)
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))
describe('Tests for ContentTypeBuilder', () => {
  it('should render the component', () => {
    render(<DataContext.Provider value={{
      getCollections: jest.fn(),
      collections: [
        {
          id: '1',
          name: 'Test'
        }
      ],
      setCollections: jest.fn(),
      enableSnackBar: jest.fn()

    }}>

        <ContentTypeBuilder />
        </DataContext.Provider>)

    expect(screen.getByText('Content Types')).toBeTruthy()
  })
  it('should open the dialog and enter some data and create a new content type', () => {
    makeRequest.mockResolvedValue({
      data: {
        data: {
          id: '1',
          name: 'Test'
        }
      }
    })
    render(<DataContext.Provider value={{
      getCollections: jest.fn(),
      collections: [
        {
          id: '1',
          name: 'Test'
        }
      ],
      setCollections: jest.fn(),
      enableSnackBar: jest.fn()

    }}>

        <ContentTypeBuilder />
        </DataContext.Provider>)

    fireEvent.click(screen.getByText('+ New Type'))
    fireEvent.change(screen.getByTestId('content-type-input'), { target: { value: 'Test' } })
    fireEvent.click(screen.getByText('Create'))
    expect(screen.getByText('Test')).toBeTruthy()
  })
  it('should update the collection when clicked', () => {
    makeRequest.mockResolvedValue({
      data: {
        data: {
          id: '1',
          name: 'Test'
        }
      }
    })
    render(<DataContext.Provider value={{
      getCollections: jest.fn(),
      collections: [
        {
          id: '1',
          name: 'Tester'
        }
      ],
      setCollections: jest.fn(),
      enableSnackBar: jest.fn()

    }}>

        <ContentTypeBuilder />
        </DataContext.Provider>)

    fireEvent.click(screen.getByTestId('collection-btn'))
    expect(screen.getByTestId('collection-btn').className).toContain('bg-customPurple')
  })
})
