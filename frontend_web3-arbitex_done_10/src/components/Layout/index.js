import {useState, useEffect} from 'react';
import { 
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Navbar from '../Navbar';
import Header from '../Header';
import Footer from '../Footer';
import './style.scss'

function Layout() {
  const [showMenu, setShowMenu] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  let location = useLocation();

  const toggleMenu = (status) => {
    setShowMenu(status)
  }

  useEffect(() => {
    if(location.pathname === '/support') {
      setShowFooter(false)
    } else {
      setShowFooter(true)
    }
  }, [location])

  return (<div className={`app-container`}>
    <Navbar 
      showMenu = {showMenu}
      toggleMenu = {toggleMenu}
    />
    <div className='main-right'>
      <Header 
        toggleMenu = {toggleMenu}
      />
      <Outlet />
      {
        showFooter && <Footer />
      }
    </div>
  </div>)
}

export default Layout;