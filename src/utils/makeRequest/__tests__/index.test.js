/* eslint-disable no-undef */
import axios, { AxiosError } from 'axios'
import { makeRequest } from '..'

jest.mock('axios')
describe('Tests for make request', () => {
  it('should return the data when the request is successful', async () => {
    const data = { data: 'data' }
    axios.mockResolvedValue(data)
    const response = await makeRequest('url', 'method', 'data')
    expect(response).toEqual('data')
  })
  it('should throw an axios error when there is a server sided error', async () => {
    const error = new AxiosError('error')
    axios.mockRejectedValue(error)
    await expect(makeRequest('url', 'method', 'data')).rejects.toBeInstanceOf(Error)
  })
  it('should throw a generic error when there is a client sided error', async () => {
    const error = new Error('error')
    axios.mockRejectedValue(error)
    await expect(makeRequest('url', 'method', 'data')).rejects.toBeInstanceOf(Error)
  })
})
