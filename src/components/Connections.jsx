import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length <= 0) return <h1 className="text-center font-bold text-2xl my-10 text-red-600"> No Connections Found</h1>;

  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-bold text-white text-3xl mb-6">Connections</h1>
      <div  className="flex flex-col gap-4 items-center">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center bg-base-300 p-4 rounded-lg w-full max-w-2xl shadow-md"
            >
              <div className="w-20 h-20 overflow-hidden rounded-full">
                <img
                  alt="photo"
                  className="w-full h-full object-cover"
                  src={photoUrl}
                />
              </div>
              <div className="sm:ml-6 mt-4 sm:mt-0 text-left w-full ">
                <h2 className="font-bold text-lg sm:text-xl text-white">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-300">
                    {age} years • {gender}
                  </p>
                )}
                {about && <p className="text-sm text-gray-400">{about}</p>}
              </div>
            </div>
          );
        })}
        </div>
    </div>
  );
};
export default Connections;