import { VALIDATE_USER } from '../../constants'
import { makeRequest } from '../../makeRequest'

const validateUser = async () => {
  try {
    const token = window.localStorage.getItem('token')
    if (!token) {
      return false
    }
    await makeRequest(VALIDATE_USER(token))
    return true
  } catch (error) {
    window.localStorage.removeItem('token')
    return false
  }
}

export default validateUser
