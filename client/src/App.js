import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/user/Dashboard'

export default function App() {
  return (
    <Routes>
      <Route path='/' element = {<HomePage/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/dashboard' element = {<Dashboard/>}/>
      <Route path='/*' element = {<PageNotFound/>}/>
    </Routes>
  )
}
