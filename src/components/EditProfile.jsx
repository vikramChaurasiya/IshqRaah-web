import React, { useState } from 'react'
import Usercard from "./Usercard"
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {

    const [firstName ,setFirstName] = useState(user.firstName);
    const [lastName ,setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age ,setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setPhotoUrl(URL.createObjectURL(file));
        }
    };


    const saveProfile = async() => {
        setError("")
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,lastName,photoUrl,age,gender,about
            },
            {withCredentials:true}
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            const i = setTimeout(()=> {
                setShowToast(false);
            }, 3000)
        } catch (err) {
            setError(err.response.data);
        }
    }

  return (
    <>
        <div className='flex flex-col  md:flex-row md:gap-0 items-center  m-4 md:mt-20 md:px-40 gap-5  px-8 '>
            <div className='w-full max-w-md'>
                <div className="card bg-base-200 text-primary-content shadow-lg md:mx-10 ">
                    <div className="card-body md:mx-auto">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
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
                        </div>
                        <div>
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
                        </div>
                        <div>
                            <label className="input validator">
                                <div className='label'>
                                    <span className='label-text'>PhotoUrl:</span>
                                </div>
                                <input 
                                    type='text'
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </label>
                        </div>
                        
                        <div>
                            <label className="input validator">
                                <div className='label'>
                                    <span className='label-text'>Age</span>
                                </div>
                                <input 
                                    type='number'
                                    value={age|| ""}
                                    onChange={(e) => setAge(e.target.value)}  
                                />
                            </label>
                        </div>
                        <div>
                            <label className="input validator">
                                <div className='label'>
                                    <span className='label-text'>gender</span>
                                </div>
                                <input 
                                    type='text'
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}  
                                />
                            </label>
                        </div>
                        
                        <div>
                            <legend className="fieldset-legend">About</legend>
                            <label>
                                
                                <textarea 
                                    className="textarea" 
                                    placeholder="About" 
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}  
                                />
                            </label>
                        </div>
                        <p className='text-red-500'>{error}</p>
                        <div className="card-actions justify-center">
                          <button className="btn btn-outline btn-success" onClick={saveProfile} >Save Profile</button>
                        </div>
                    </div>

                </div>
            </div>
            <Usercard user={{firstName,lastName,photoUrl,age,gender,about}}/>
        </div>
        {showToast && <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span> Profile successfully edit.</span>
            </div>
        </div>}
    </>
  )
}

export default EditProfile
