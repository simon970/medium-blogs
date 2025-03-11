import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useState } from "react";

export const Appbar = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    localStorage.removeItem('token');
    navigate("/signin")
};


  return (
    <div>
      <div className="border-b flex justify-between px-10 py-4 ">
        <Link to={"/blogs"}>
          <div className="cursor-pointer">Medium</div>
        </Link>
        <div>
          <Link to={"/publish"}>
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              New
            </button>
          </Link>
          <span onClick={()=>{setModal(true)}} className="cursor-pointer">
            <Avatar name="Simon" />
          </span>
        </div>
      </div>

      {modal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-slate-200 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-black mb-4">Do you want to Logout?</h2>
            <div className="flex justify-around">
              <button
                onClick={toggleModal}
                className="bg-black text-white px-4 py-2 rounded-lg "
              >
                Yes
              </button>
              <button
                onClick={() => setModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
