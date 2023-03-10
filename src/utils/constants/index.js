export const BASE_URL = 'http://localhost:8000/api/'
export const AUTH_BASE_URL = 'http://localhost:5000/auth/'

const token = () => window.localStorage.getItem('token')
export function LOGIN ({ email, password }) {
  return {
    baseUrl: AUTH_BASE_URL,
    url: 'login',
    method: 'POST',
    data: { email, password }
  }
}

export function REGISTER ({ email, password }) {
  return {
    baseUrl: AUTH_BASE_URL,
    url: 'user',
    method: 'POST',
    data: { email, password }
  }
}

export function GET_COLLECTIONS () {
  return { url: 'collections', method: 'GET', headers: { Authorization: token() } }
}

export function ADD_COLLECTION (name) {
  return {
    url: 'collections',
    method: 'POST',
    data: { name },
    headers: { Authorization: token() }
  }
}

export function MODIFY_COLLECTION (id, name) {
  return {
    url: 'collections/' + id,
    method: 'PATCH',
    data: { name },
    headers: { Authorization: token() }
  }
}

export function GET_FIELDS (id) {
  return { url: '/fields/' + id, method: 'GET', headers: { Authorization: token() } }
}

export function GET_ENTRIES (collectionId) {
  return {
    url: 'entries/' + collectionId,
    headers: { Authorization: token() },
    method: 'GET'
  }
}

export function ADD_FIELD (collectionId, name) {
  return {
    url: 'fields',
    method: 'POST',
    headers: { Authorization: token() },
    data: { collectionId, name }
  }
}

export function ADD_ENTRY (collectionId, data) {
  return {
    url: 'entries',
    method: 'POST',
    headers: { Authorization: token() },
    data: { collectionId, fields: data }
  }
}

export function MODIFY_ENTRY (id, data) {
  return {
    url: 'entries/' + id,
    method: 'PUT',
    data,
    headers: { Authorization: token() }
  }
}

export function DELETE_ENTRY (id) {
  return {
    url: 'entries/' + id,
    method: 'DELETE',
    headers: { Authorization: token() }
  }
}

export function EDIT_FIELD (id, name) {
  return {
    url: 'fields/' + id,
    method: 'PATCH',
    data: { name },
    headers: { Authorization: token() }
  }
}

export function DELETE_FIELD (id) {
  return {
    url: 'fields/' + id,
    method: 'DELETE',
    headers: { Authorization: token() }
  }
}

export function VALIDATE_USER (token) {
  return {
    baseUrl: AUTH_BASE_URL,
    url: 'validate',
    method: 'GET',
    headers: { token }
  }
}

export const DASHBOARD_ROUTE = '/'
export const LOGIN_ROUTE = '/login'
export const REGISTER_ROUTE = '/register'
export const ERROR_ROUTE = '/error'
export const COLLECTIONS_ROUTE = '/collections'
export const BUILDER_ROUTE = '/builder'
