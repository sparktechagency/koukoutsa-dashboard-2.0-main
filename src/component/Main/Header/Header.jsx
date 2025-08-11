/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { RiNotificationFill } from "react-icons/ri";
import userImage from "/public/Auth/user.png";
import { MdNotificationsNone } from "react-icons/md";
import { useGetUserProfileQuery } from "../../../redux/features/setting/settingApi";
import { useEffect } from "react";
import Url from "../../../redux/baseApi/forImageUrl";
import { useGetAllNotificationsQuery } from "../../../redux/features/notification/notification";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const { data: userProfile, refetch } = useGetUserProfileQuery();
  const user = userProfile?.data?.attributes?.user || {};
 


  const { data } = useGetAllNotificationsQuery();
  const notifications = data?.data?.attributes?.notifications || [];
  const unreadCount = notifications.filter((item) => item.status === "unread").length;


  useEffect(() => {
    refetch();
  }, [refetch]);


  return (
    <div className="w-full px-5 py-3.5 bg-[#ffd400] flex justify-between items-center text-white sticky top-0 left-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>
      </div>

      <div className="flex justify-between items-center gap-5">
        <Link to={"/notification"}>
          <h1 className="relative text-[#ffd400] p-2 rounded-full bg-white">
            <MdNotificationsNone className="size-8" />
            <span className="absolute top-0 right-0 w-5 h-5 text-white text-xs flex justify-center items-center bg-red-500 rounded-full">{unreadCount}</span>
          </h1>

        </Link>
        <Link to={"/settings/personal-info"}>
          <img
            className="w-12 h-12 rounded-full border-2 border-white hover:border-[#344f47] transition-all duration-300 cursor-pointer"
            src={user?.profileImage ? Url + user?.profileImage : userImage}
            alt="User Profile"
          />
        </Link>
        <div className="hidden md:block">
          <h1 className="">{user?.fullName}</h1>
          <span className="">{user?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;