import React, { useState, useEffect } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import { MdClear } from 'react-icons/md';
import { FaBars, FaUserAlt } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { logout } from '../../redux/action/users';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import Searchbar from '../Searchbar/Searchbar'

function Navbar() {
  const [sideBar, setSideBar] = useState('-100%');
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  const windowDimension = () => {
    setWinWidth(window.innerWidth);
  };

  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.addEventListener('resize', windowDimension);
    return () => window.removeEventListener('resize', windowDimension);
  }, []);

  return (
    <>
      <div className='nav'>
        <span className='brand'>
          joeDev
        </span>
        <Searchbar />
        <ul>
        
        <li>
            <Link className='text-light mr-2' to='/cart'>
              <AiOutlineShoppingCart size={30} />
            </Link>
          </li>
          <li>
            <Link to='/' className='nav-link'>
              Products
            </Link>
          </li>


         {/* Not auth */}
          {user && !isAuth && (
            <>
              <li>
                <Link to='/login' className='nav-link'>
                  <FaUserAlt /> Sign in
                </Link>
              </li>
            </>
          )}

          {/* ifAuth */}
          {user && isAuth && (
            <>
              <li>
                <Dropdown className='nav-link'>
                  <Dropdown.Toggle className='dropdown-toggle d-flex' id='#items'>
                  {user.avatar.url ? 
                   <Image className='profile-picture' src={user.avatar.url} /> 
                   :
                   <span className='profile-picture-name' >{`${user.fName.slice(0,1).toUpperCase()}`}</span>
                   }
                   {user.fName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="pl-2">
                      <Link className='nav-link  text-dark' to='/users/profile'>Profile</Link>
                      <Link  onClick={() => dispatch(logout())} to='/login' className='nav-link  text-dark'> Sign out</Link>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              
              {/* admin routes */}
              {user.isAdmin && (
              <li>
                <Dropdown className='nav-link'>
                  <Dropdown.Toggle className='dropdown-toggle' id='#items'>
                    ADMIN
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="pl-2">
                      <Link className='nav-link  text-dark' to='/admin/users'>Users</Link>
                      <Link className='nav-link  text-dark' to="/admin/products">Products</Link>
                      <Link className='nav-link  text-dark' to='/admin/orders'> Orders</Link>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              )}
            </>
          )}

        <li>
        <FaBars
            className='sidebar-toggle ml-4'
            onClick={() => setSideBar(0)}
            style={{ color: 'white' }}
            size={30}
          />{' '}
        </li>

        </ul>
      </div>

      {/* sidebar */}
      {winWidth <= 770 && (
        <div style={{ left: sideBar }} className='sidebar'>
          <p>
            <MdClear
              onClick={() => setSideBar('-100%')}
              className='nav-link-clear'
              size={29}
            />
          </p>
          <ul>
            <li>
              <Link
                to='/'
                onClick={() => setSideBar('-100%')}
                className='nav-link'
              >
                Products
              </Link>
            </li>
            {!isAuth && (
              <>
                <li>
                  <Link
                    onClick={() => setSideBar('-100%')}
                    to='/login'
                    className='nav-link'
                  >
                    <FaUserAlt /> Sign in
                  </Link>
                </li>
              </>
            )}
            {isAuth && (
              <>
                <li>
                  <Dropdown className='nav-link'>
                    <Dropdown.Toggle className='dropdown-toggle' id='#items'>
                      <img
                        className='profile-picture'
                        src={user.avatar}
                        alt='profile'
                      />{' '}
                      {user.fName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className='nav-link'>
                        <Link
                          to='/users/profile'
                          onClick={() => setSideBar('-100%')}
                        >
                          Profile
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          dispatch(logout());
                          setSideBar('-100%');
                        }}
                      >
                        <Link to='/login' className='nav-link'></Link>
                        Sign out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
