import React, { useDebugValue } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = async() => {
    try {
      const res = await axios.post(BASE_URL + "/logout",{},{withCredentials:true});
      dispatch(removeUser())
      return navigate("/login")
    } catch (err) {
      console.error(err)  
    }
  }

  return (
    <>
        <div className="navbar bg-base-300 shadow-sm  flex-wrap sm:flex-nowrap ">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl pl-0.5">👋IshqRaah</Link>
            </div>
            {user && 
              <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-wrap sm:flex-nowrap">
                <p className='text-sm md:text-xl sm:text-base font-medium whitespace-nowrap'>Welcome, {user.firstName}</p>
                <div className="dropdown dropdown-end ml-2">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="user photo"
                          src={user.photoUrl || "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001884.png"} 
                        />
                      </div>
                    </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <Link to="/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                    <li><Link to="/connections">Connection</Link></li>
                    <li><Link to="/requests">Requests</Link></li>
                    <li><a onClick={handelLogout}>Logout</a></li>
                  </ul>
                </div>
            </div>}
        </div>
    </>
  )
}

export default NavBar
