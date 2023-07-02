import { React, useRef } from "react";
import { CgLogOut } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

import { Button } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../assets/images/avatar3.jpg";

const UserProfile = ({ setProfileClicked, userRef, userImageRef }) => {
  const { currentColor, setIsClicked, initialState, setThemeSettings } =
    useStateContext();

  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth);
  console.log(userInfo);

  const userProfileMenuRef = useRef();

  window.addEventListener("click", (e) => {
    if (
      e.target !== userProfileMenuRef.current &&
      e.target !== userRef.current &&
      e.target !== userImageRef.current
    ) {
      setProfileClicked(false);
    }
  });

  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.info("Logged Out Successfully !!", {
        theme: "dark",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={userProfileMenuRef}
      className="nav-item absolute right-4 top-16 bg-white dark:bg-[#42464D] dark:text-gray-200 p-4 rounded-xl md:w-64 w-48"
    >
      <div className="mt-1">
        <div className="relative flex">
          <CgLogOut className="z-10 text-white  absolute left-3 top-3 text-2xl " />
          <div className="border z-10 border-white h-8 ml-7 absolute left-5 top-2 opacity-30"></div>
          <button
            style={{
              color: "white",
              borderRadius: "6px",
            }}
            className="p-3 w-full bg-gray-700 dark:bg-gray-500 dark:hover:bg-red-400 hover:drop-shadow-xl hover:transition ease-out duration-700"
            onClick={() => {
              setIsClicked(initialState);
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>

        <div className="relative">
          <FiSettings className="z-10 text-white absolute left-3 top-5 text-2xl " />
          <div className="border z-10 border-white h-8 ml-7 absolute left-5 top-4 opacity-50"></div>
          <button
            type="button"
            onClick={() => {
              setThemeSettings(true);
              setProfileClicked(false);
            }}
            style={{ background: currentColor, borderRadius: "6px" }}
            className="text-base w-full mt-2 text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
