import axios, { AxiosError } from 'axios'
import { BASE_URL } from '../constants'
export const makeRequest = async (config) => {
  try {
    const response = await axios({ ...config, baseURL: config.baseUrl ?? BASE_URL })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('Something went Wrong')
    }
  }
}
