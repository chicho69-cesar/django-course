import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import AddBlog from './private/AddBlog'
import EditBlog from './private/EditBlog'
import EditProfile from './private/EditProfile'
import Feed from './private/Feed'
import MyProfile from './private/MyProfile'
import OneBlog from './private/OneBlog'
import UserProfile from './private/UserProfile'
import Landing from './public/Landing'
import Login from './public/Login'
import Register from './public/Register'
import Header from '../components/Header'

export default function Router() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' exact element={<Feed />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/user-profile/:id' element={<UserProfile />} />
          <Route path='/add-blog' element={<AddBlog />} />
          <Route path='/one-blog/:id' element={<OneBlog />} />
          <Route path='/edit-blog/:id' element={<EditBlog />} />
          <Route path='/edit-profile' element={<EditProfile />} />
        </Route>
        
        <Route path='/landing' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
