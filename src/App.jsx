import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import ErrorPage from './pages/Error'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/Home'
import AuthPage from './pages/AuthPage'
import {
  DASHBOARD_ROUTE,
  ERROR_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE
} from './utils/constants'
import BuilderPage from './pages/BuilderPage'
import ProtectedRoute from './components/ProtectedRoute'
import DataState from './context/DataContext'
import CollectionsPage from './pages/CollectionsPage'

function App () {
  return (
    <DataState>
      <BrowserRouter>
        <Routes>
          <Route
            path={DASHBOARD_ROUTE}
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path={LOGIN_ROUTE} element={<AuthPage />} />
          <Route path={REGISTER_ROUTE} element={<AuthPage />} />
          <Route path={`${ERROR_ROUTE}/:code?`} element={<ErrorPage />} />
          <Route
            path="/builder"
            element={
              <ProtectedRoute>
                <BuilderPage />
              </ProtectedRoute>
            }
          />
          <Route path="/collections/:id?" element={<ProtectedRoute>
            <CollectionsPage />

          </ProtectedRoute> } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </DataState>
  )
}

export default App
