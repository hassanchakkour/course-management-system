import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCurrencyDollar, BsShield } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

import { Button } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../assets/images/avatar3.jpg";
import { FiSettings } from "react-icons/fi";

const UserProfile = () => {
  const { currentColor, setIsClicked, initialState, setThemeSettings } =
    useStateContext();

  const navigate = useNavigate();

  const userProfileData = [
    {
      icon: <BsCurrencyDollar />,
      title: "My Profile",
      desc: "Account Settings",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
    },
    {
      icon: <BsShield />,
      title: "My Inbox",
      desc: "Messages & Emails",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
    },
  ];
  const userInfo = useSelector((state) => state.auth);
  console.log(userInfo);

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
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] dark:text-gray-200 p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
          onClick={() => setIsClicked(initialState)}
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl">
            {" "}
            {userInfo ? userInfo.userInfo.name : null}{" "}
          </p>
          <p className="text-gray-500 text-sm capitalize">
            {" "}
            {userInfo ? userInfo.userInfo.specialization : null}{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold">
            {" "}
            {userInfo ? userInfo.userInfo.email : null}{" "}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <button
          style={{
            color: "white",
            borderRadius: "10px",
          }}
          className="p-3 w-full bg-gray-700 dark:bg-gray-500 hover:drop-shadow-xl"
          onClick={() => {
            setIsClicked(initialState);
            handleLogout();
          }}
        >
          Logout
        </button>

        <button
          type="button"
          onClick={() => setThemeSettings(true)}
          style={{ background: currentColor, borderRadius: "10px" }}
          className="text-base w-full mt-5 text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
