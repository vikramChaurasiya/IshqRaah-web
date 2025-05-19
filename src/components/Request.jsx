import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {BASE_URL} from "../utils/constants"
import { addRequests, removeRequest } from '../utils/requestSlice';
import axios from 'axios';

const Request = () => {

  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/"+ status + "/" + _id, 
        {}, 
        {withCredentials: true}
      );
      dispatch(removeRequest(_id))

    } catch (err) {
      
    }
  }
  
  const fechRequests = async () => {
      try {
          const res = await axios.get(BASE_URL +"/user/request/received" ,{
              withCredentials :true
          });
          dispatch(addRequests(res.data.data));
      } catch (err) {
          
      }
  }
  useEffect(() => {
      fechRequests();
  },[])
  if (!requests) return null;

  if (requests.length === 0) return <h1 className="text-center font-bold text-2xl mt-10 text-red-700"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id} 
            className="flex m-8 p-4 rounded-lg bg-base-300 mx-auto w-110"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 object-contain rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className='flex gap-2 items-center'>
              <button 
                className="btn btn-active btn-primary"
                onClick={()=> reviewRequest("accepted", request._id)}
              >Accept</button>
              <button 
                className="btn btn-active btn-secondary"
                onClick={()=> reviewRequest("rejected", request._id)}
              >Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Request
