import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blog from './pages/Blog'
import BlogInfo from './pages/BlogInfo'
import { Create } from './pages/Create'
import MediumLandingPage from './pages/LandingPage'
import UserInfo from './pages/UserInfo'
import UserProfile from './pages/UserDetails'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MediumLandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogInfo />} />
          <Route path="/create" element={<Create />} />
          <Route path="/user/:id" element={<UserInfo />} />
          <Route path="profile" element={<UserProfile />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
