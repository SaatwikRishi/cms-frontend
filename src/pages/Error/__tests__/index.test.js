import { render, screen } from '@testing-library/react'
import { useParams } from 'react-router-dom'
import ErrorPage from '..'
jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}))

describe('Tests for Error page', () => {
  it('should render the Error page', () => {
    useParams.mockReturnValue({ })

    render(<ErrorPage />)
    expect(screen.findByText('Error')).toBeTruthy()
  })
  it('should render the Error page with a custom code', () => {
    useParams.mockReturnValue({ code: 404 })

    render(<ErrorPage />)
    expect(screen.getByText('Error 404')).toBeTruthy()
  })
})
