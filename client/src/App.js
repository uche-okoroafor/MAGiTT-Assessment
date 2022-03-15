import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Login from './Pages/Login/Login'
import React from 'react'
import Home from './Pages/Home/Home'
import CreateProfile from './Pages/CreateProfile/CreateProfile'
import Profile from './Pages/Profile/Profile'
import SignUp from './Pages/SignUp/SignUp'
import { AuthProvider } from './Contexts/AuthContext'
import { UsersProvider } from './Contexts/UsersContext'
import { CompanyProvider } from './Contexts/CompanyContext'
import { SnackBarProvider } from './Contexts/SnackBarContext'
import AppLayout from './Components/AppLayout/AppLayout'

function App () {
  return (
    <BrowserRouter>
      <SnackBarProvider>
        <AuthProvider>
          <CompanyProvider>
            <UsersProvider>
              <Routes>
                <Route exact path='/' element={<Navigate to='/login' />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/sign-up' element={<SignUp />} />

                <Route element={<AppLayout />}>
                  {/* <Route exact path='/home' element={<Home />} /> */}

                  <Route exact path='/home' element={<ProtectedRoute />}>
                    <Route exact path='/home' element={<Home />} />
                  </Route>
                  <Route
                    exact
                    path='/profile/:name'
                    element={<ProtectedRoute />}
                  >
                    <Route exact path='/profile/:name' element={<Profile />} />
                  </Route>
                  <Route
                    exact
                    path='/create/profile'
                    element={<ProtectedRoute />}
                  >
                    <Route path='/create/profile' element={<CreateProfile />} />
                  </Route>
                </Route>
              </Routes>
            </UsersProvider>
          </CompanyProvider>
        </AuthProvider>
      </SnackBarProvider>
    </BrowserRouter>
  )
}

export default App
