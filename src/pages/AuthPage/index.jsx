import React, { useContext } from 'react'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import LoginImage from '../../assets/login/login-image.png'
import screenText from '../../screenText'
import authFunctions from './authFunctions'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE
} from '../../utils/constants'
import { DataContext } from '../../context/DataContext'
export default function AuthPage () {
  const location = useLocation()
  const navigate = useNavigate()
  const context = useContext(DataContext)
  const isRegistration = location.pathname === '/register'

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleButtonClick = async (e) => {
    try {
      if (isRegistration) {
        await authFunctions.handleRegisterClick(e, email, password)
        navigate(LOGIN_ROUTE)
        return
      }
      await authFunctions.handleLoginClick(e, email, password)
      navigate(DASHBOARD_ROUTE)
    } catch (error) {
      context.enableSnackBar(error.message)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row w-screen h-screen bg-loginDark ">
      <div className="lg:w-[55%] h-[inherit] bg-loginLight relative overflow-hidden">
        <div className="w-[200px] h-[200px] absolute right-6 top-5 rounded-full bg-white"></div>
        <div className="w-[120px] h-[120px] absolute right-44 top-52 rounded-full bg-white"></div>

        <div className="w-[200px] h-[200px] absolute bottom-8 rounded-full bg-white"></div>
        <div className="w-[120px] h-[120px] absolute bottom-[-50px] left-40 rounded-full bg-white"></div>

        <div className="h-[30%]  flex items-center relative pl-[10%] z-10">
          <h2 className="text-3xl font-bold">
            {screenText.login.leftTitle1}
            <br />
            <br /> {screenText.login.leftTitle2}
          </h2>
        </div>
        <div className="h-[50%] z-20 flex justify-center relative w-[100%]">
          <img className="" src={LoginImage} />
        </div>
      </div>

      <div className="lg:w-[45%] p-10 flex-col flex">
        <span className="h-[20%] flex justify-center items-end">
          <h2 className="font-bold text-white text-3xl">
            {!isRegistration
              ? screenText.login.loginText
              : screenText.register.registerText}
          </h2>
        </span>
        <span className="w-[100%] lg:h-[80%]  flex-col  flex items-center justify-center">
          <form className="mb-5 max-w-[400px] w-[80%] gap-y-7 flex flex-col">
            <CustomInput
              type={'email'}
              onChange={handleEmailChange}
              label="Email"
              className="text-white"
            />
            <CustomInput
              type={'password'}
              onChange={handlePasswordChange}
              label="Password"
              className="text-white"
            />
            <CustomButton onClick={handleButtonClick}>
              {!isRegistration
                ? screenText.login.loginButton
                : screenText.register.registerButton}
            </CustomButton>
          </form>
          {!isRegistration && (
            <button className="text-gray-400 underline">
              {screenText.login.forgotPassword}
            </button>
          )}
          <button
            onClick={() => {
              if (isRegistration) {
                navigate(LOGIN_ROUTE)
                return
              }
              navigate(REGISTER_ROUTE)
            }}
            className="text-gray-400 underline"
          >
            {!isRegistration
              ? screenText.login.loginLink
              : screenText.register.registerLink}
          </button>
        </span>
      </div>
    </div>
  )
}
