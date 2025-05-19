import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUserFeed } from '../utils/feedSlice';



const Usercard = ({user}) => {
    // console.log(user);
    const { _id, firstName,lastName, photoUrl ,age,gender, about} = user;
    const dispatch = useDispatch();

    const handelSendRequest = async(status, userId ) => {
      try {
        const res = await axios.post(
          BASE_URL + "/request/send/" + status + "/" + userId,
          {},
          {withCredentials: true},
        )
        dispatch(removeUserFeed(userId));


      } catch (err) {
        console.log(err)
      }
    }

  return (
    <div className="w-full flex justify-center md:mb-10 md:mx-0 ">
        <div className="card bg-base-200 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg  ">
            <figure className="px-6 pt-6">
              <img
                src={photoUrl || "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001884.png"}
                alt="photo"
                className="rounded-xl w-32 h-32 object-cover" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-base md:text-lg">{firstName + " " + lastName}</h2>
              {age && gender && (
                <p className ="text-gray-500 text-sm md:text-base">{age} years • {gender}</p>
              )}
              {about && <p className="text-sm md:text-base">{about}</p>}
              <div className="card-actions mt-4 flex flex-col sm:flex-row gap-2 w-full justify-center">
                <button className="btn btn-outline btn-error w-full sm:w-auto" onClick={() => handelSendRequest("ignored", _id)}>Ignore</button> 
                <button className="btn btn-primary w-full sm:w-auto" onClick={() => handelSendRequest("interested" , _id)} >Interested</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Usercard
