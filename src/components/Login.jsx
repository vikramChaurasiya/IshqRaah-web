import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");
  const[isLoginForm, SetIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async()=> {
    try {
      const res = await axios.post(
        BASE_URL+"/login", 
        {
          emailId,
          password
        },{ withCredentials: true}
      );
      dispatch(addUser(res.data));
      return navigate('/')
    } catch (err) {
      setError(err?.response?.data || "Something went wrong ");
    }
  }

  const handleSignUp = async() => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup", 
        {firstName, lastName, age, photoUrl, gender, about, emailId, password },
        {withCredentials:true},
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile")
    } catch (err) {
      setError(err?.response?.data || "Something went wrong ");
    }
  }


  return (
    <>
      <div className='flex justify-center my-10 mb-35 md:mb-0'>
        <div className="card bg-base-200 text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">{isLoginForm? "Login": "signUp"}</h2>
            <div>
              {!isLoginForm &&
              <div className='flex flex-col gap-2'>
                <label className="input validator">
                  <div className='label'>
                      <span className='label-text'>FirstName</span>
                  </div>
                  <input 
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="input validator">
                  <div className='label'>
                      <span className='label-text'>LastName</span>
                  </div>
                  <input 
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="input validator">
                  <div className='label'>
                      <span className='label-text'>Age</span>
                  </div>
                  <input 
                    type='number'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="input validator">
                  <div className='label'>
                      <span className='label-text'>PhotoUrl</span>
                  </div>
                  <input 
                      type='text'
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <div>
                  <p>Selected Gender: </p>
                  <div className='flex flex-row gap-3'>
                    <label>
                      <input
                        type="radio"
                        className='radio radio-sm'
                        value="male"
                        checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <span className='m-2'>Male</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        className='radio radio-sm'
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <span className='m-2'>Female</span>
                    </label>
                  </div>
                </div>
              <div>
                <label>
                  <div className='label'>
                      <span className='label-text'>About</span>
                  </div>
                  <textarea 
                      className="textarea" 
                      placeholder="About" 
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}  
                  />
                </label>
              </div>
              </div>
              }
              <label className="input validator mt-2">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input 
                  type="email" 
                  value={emailId}
                  placeholder="@gmail.com" 
                  required 
                  onChange={(e) => setEmailId(e.target.value)}
                  />
              </label>
              <div className="validator-hint hidden">Enter valid email address</div>
            </div>
            <div>
              <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                    ></path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
              </p>
            </div>
            <p className='text-red-500'>{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-outline btn-success" onClick={isLoginForm ? handleLogin : handleSignUp}>
                {isLoginForm? "Login" : "Sign Up"}
              </button>
            </div>
            <p className='m-auto text-blue-300 hover:text-blue-500 cursor-pointer' onClick={() => SetIsLoginForm((value) => !value)}>{isLoginForm? "New User? SignUp Here": "Existing User? Login Here"}</p>
          </div>
        </div>    
      </div>
    </>
  )
}

export default Login
