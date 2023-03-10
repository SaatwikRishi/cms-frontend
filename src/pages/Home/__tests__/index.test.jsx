import { render, jest } from '@testing-library/react'
import React from 'react'
import { makeRequest } from 

jest.mock('../../../utils/makeRequest', () => ({
    makeRequest: jest.fn()
}))

describe('Tests for HomePage', () => {
  it('should render the HomePage', () => {
    makeRequest.mockResolvedValue({ data: { data: [] } })
    const { getByTestId } = render(<HomePage />)
    expect(getByTestId('home-page')).toBeInTheDocument()
  })
})
