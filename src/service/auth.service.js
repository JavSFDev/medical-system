import { useSubmitForm } from '../hooks/useSubmitForm'
import jwtDecode from 'jwt-decode'

export function register ({ formData, start }) {
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'user', action: 'POST', formData, start })
  return { responseData, errorData, loadedData }
}

export function login ({ data }) {
  if (data != null) {
    localStorage.setItem('user', JSON.stringify(data))
    return true
  }
  return false
}

export function logout () {
  localStorage.removeItem('user')
}

export function getCurrentUser () {
  let user = null
  try {
    const token = JSON.parse(localStorage.getItem('user'))
    user = jwtDecode(token)
    return user
  } catch (error) {
    return null
  }
}
export function autorize ({ allowedRoles }) {
  let user = null
  try {
    const token = JSON.parse(localStorage.getItem('user'))
    user = jwtDecode(token)
    return user && user.rol && allowedRoles.includes(user.rol.name)
  } catch (error) {
    return null
  }
}
