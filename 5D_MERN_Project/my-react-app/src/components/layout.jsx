import React from 'react';
import { useState, useEffect} from 'react';
import '../css/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LoginLogo from '../images/5dLogo.svg'
import hamburger from '../images/ham.svg'
import profileImg from '../images/profile.svg'

const Layout = ({ children }) => {

  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Event handler to toggle the dropdown state
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

function logout(){
  sessionStorage.clear();
  alert("you have choosen to logout")
  navigate("/")
}

  return (
    <div>
      
      <section className='section-dashboard d-flex'>
          <div className='left-side-dash'>
            <nav className='navigation-bar'>
              <div className='text-center p-4'>
                <img src={LoginLogo} className='nav-logo' alt='nav-logo'/>
              </div>
              <ul className='ul-nav'>
                <li className='li-nav'>Profile</li>
                <li className='li-nav' onClick={toggleDropdown}>Moments</li>

                {/* Render the dropdown content conditionally based on the state */}
                {dropdownOpen && (
                  <ul className='dropdown-content'>
                    <li>Option 1</li>
                    <li>Option 2</li>
                    {/* Add more dropdown options as needed */}
                  </ul>
                )}
              </ul>
              <p className='mt-4 pr-3'>Add New Moments</p>
            </nav>
          </div>
          <div className='right-side-dash'>
            <header className='5dHeader'>
                <div className='parent-header'>
                    <img src={hamburger} className='hamClass' alt='button-nav' />
                    <img src={profileImg} className='profileClass' alt='button-profile' onClick={logout} style={{cursor:'pointer'}}/>
                </div>
            </header>
            <div className='main-dashboard'>
              {children}
            </div>
          </div>
      </section>
      
    </div>
  );
};

export default Layout;