import styled from 'styled-components'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getToken, logout } from 'services/auth'

const INTERVAL_TIME = 5000
const InvisibilityDOM = styled.div`
  display: none;
`

function ValidateToken(): JSX.Element {
  // const { getToken, signOut } = useAuth()
  const history = useHistory()

  const signOutAndRedirectToLoginPage = (): boolean => {
    logout()
    history.push('/login')
    return true
  }

  const validateFirebaseToken = (): boolean => {
    const token = getToken()
    if (!token) {
      signOutAndRedirectToLoginPage()
      return false
    }

    const currentDate = Math.round(new Date().getTime() / 1000)
    const { exp } = jwtDecode<JwtPayload>(token)
    if (exp && currentDate > exp) {
      signOutAndRedirectToLoginPage()
      return false
    }

    return true
  }

  useEffect(() => {
    const interval = setInterval(() => {
      validateFirebaseToken()
    }, INTERVAL_TIME)

    return () => clearInterval(interval)
  })

  return <InvisibilityDOM />
}

export default ValidateToken
