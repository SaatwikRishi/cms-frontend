import { render, screen } from '@testing-library/react'
import NotFoundPage from '..'
import React from 'react'

describe('NotFoundPage', () => {
  it('should render when component is called', () => {
    const { container } = render(<NotFoundPage />)
    // Assert
    expect(container).toMatchSnapshot()
    expect(screen.getByText('Page Not Found')).toBeTruthy()
  })
})
