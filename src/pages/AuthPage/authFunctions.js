import { LOGIN, REGISTER } from '../../utils/constants'
import { makeRequest } from '../../utils/makeRequest'

const handleLoginClick = async (e, email, password) => {
  e.preventDefault()
  if (!email.includes('@')) { throw new Error('Email is not valid') }
  if (password.length < 6) { throw new Error('Password should atleast be 6 characters') }
  const data = await makeRequest(LOGIN({ email, password }))
  window.localStorage.setItem('token', data.data.token)
  return true
}
const handleRegisterClick = async (e, email, password) => {
  e.preventDefault()
  if (!email.includes('@')) { throw new Error('Email is not valid') }
  if (password.length < 6) { throw new Error('Password should atleast be 6 characters') }
  await makeRequest(REGISTER({ email, password }))
}

export default { handleLoginClick, handleRegisterClick }
