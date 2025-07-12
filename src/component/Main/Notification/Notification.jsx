import { message, Pagination } from "antd";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import moment from "moment";
import { useGetAllNotificationsQuery, useMarkNotificationAsReadMutation } from "../../../redux/features/notification/notification";

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetAllNotificationsQuery();
  const notifications = data?.data?.attributes?.notifications || [];
  const unreadCount = notifications.filter((item) => item.status === "unread").length;
  
  const pageSize = 10; // Show 10 notifications per page

  // Pagination Logic
  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();
  const handleNotificationClick = (id) => {
    try {
      const res = markNotificationAsRead(id);
      if (res) {
        message.success("Notification marked as read successfully.");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      message.error("Failed to mark notification as read. Please try again.");
    }
    console.log("Notification clicked:", id);
  };

  return (
    <div className="p-4">
      <Link to={"/"} className="text-2xl flex items-center mb-4">
        <FaAngleLeft /> Notification
        {unreadCount > 0 ? `(${unreadCount})` : "00"}
      </Link>

      <div className="space-y-4">
        {paginatedNotifications?.map((item) => (
          <div
            key={item.id}
            onClick={() => handleNotificationClick(item._id)} // Add a click handler if needed
            className={`border border-[#ffd400] cursor-pointer rounded-md p-4 flex items-center space-x-4 ${item?.status === "unread" ? "bg-[#ffd4003b]" : "bg-white"}`}
          >
            <div className="text-[#ffd400] border border-[#ffd400] rounded-full p-2">
              <span className="bg-[#ffd400] p-1.5 rounded-full absolute ml-4 z-20"></span>
              <IoMdNotificationsOutline size={30} className="relative" />
            </div>
            <div>
              <p className="font-semibold">{item?.content}</p>
              <p className="text-gray-500">{moment(item?.createdAt).fromNow()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Centering the Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={notifications.length} // Correct total count based on the actual data
          pageSize={pageSize}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Notification;
