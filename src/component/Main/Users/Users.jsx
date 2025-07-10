import { useEffect, useState } from "react";
import { ConfigProvider, Table, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";

const { Item } = Form;

const Users = () => {
  const { data, isLoading, refetch } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,  // Ensures refetch on mount or arg change
  });

  const allUsers = data?.data?.attributes?.users || []; // Fallback to an empty array if data is undefined

  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState(allUsers); // Initialize with demo data

  // User details visibility state
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [userDataFull, setUserDataFull] = useState(null); // Store full user data for the selected user

  // Search Filter
  useEffect(() => {
    if (searchText.trim() === "") {
      setDataSource(allUsers); // Reset to all users
    } else {
      setDataSource(
        allUsers?.filter(
          (user) =>
            user.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
            String(user.phoneNumber).includes(searchText)
        )
      );
    }
  }, [searchText, allUsers]);

  // Date Filter
  useEffect(() => {
    if (!selectedDate) {
      setDataSource(allUsers); // Reset to all users if no date is selected
    } else {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      setDataSource(
        allUsers?.filter(
          (user) => moment(user.createdAt).format("YYYY-MM-DD") === formattedDate
        )
      );
    }
  }, [selectedDate, allUsers]);

  // Trigger refetch when component is mounted or on reload
  useEffect(() => {
    refetch();  // Force refetch on component mount or reload
  }, [refetch]);

  const handleShowDetails = (user) => {
    setUserDataFull(user); // Set the selected user details
    setDetailsVisible(true); // Show user details section
  };

  const columns = [
    { title: "#SI", dataIndex: "si", key: "si" },
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div onClick={() => handleShowDetails(record)} className="cursor-pointer">
          <IoEyeOutline className="text-2xl" />
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="md:flex justify-between items-center py-6 mb-4">
        <Link to={"/"} className="text-2xl flex items-center">
          <FaAngleLeft /> Renter User list {detailsVisible ? "Details" : ""}
        </Link>
        <Form layout="inline" className="flex space-x-4">
          <Item name="date">
            <DatePicker
              className="rounded-md border border-[#ffd400]"
              onChange={(date) => setSelectedDate(date)}
              placeholder="Select Date"
            />
          </Item>
          <Item name="username">
            <Input
              className="rounded-md w-[70%] md:w-full border border-[#ffd400]"
              placeholder="User Name"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Item>
          <Item>
            <button className="size-8 rounded-full flex justify-center items-center bg-[#ffd400] text-white">
              <IoIosSearch className="size-5" />
            </button>
          </Item>
        </Form>
      </div>

      <div className={`${detailsVisible ? "grid lg:grid-cols-2 gap-5" : "block"} duration-500`}>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#ffd400",
                headerColor: "#fff",
                headerBorderRadius: 5,
              },
            },
          }}
        >
          <Table
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              onChange: setCurrentPage,
            }}
            scroll={{ x: "max-content" }}
            responsive={true}
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
            loading={isLoading}
          />
        </ConfigProvider>

        {/* User Details Section */}
        <div className={`${detailsVisible ? "block" : "hidden"} duration-500`}>
          <div className=" w-full md:w-2/4 mx-auto border-2 border-[#ffd400] p-2 rounded-lg relative">
            <div onClick={() => setDetailsVisible(false)} className="absolute bg-[#ffd400] text-white p-3 rounded-full -top-5 -left-5 cursor-pointer">
              <FaArrowLeft className="text-2xl" />
            </div>

            {/* User Profile Section */}
            <div className="flex items-center justify-between gap-5 mb-5">
              <div className="flex items-center gap-5">
                <img
                  className="w-24 h-24 rounded-full"
                  src="../../../public/logo/userimage.png"
                  alt="User"
                />
                <h1 className="text-2xl font-semibold">{userDataFull?.fullName}</h1>
              </div>
            </div>

            {/* User Details Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                <span className="font-semibold">Name</span>
                <span>{userDataFull?.fullName}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                <span className="font-semibold">Email</span>
                <span>{userDataFull?.email}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                <span className="font-semibold">Status</span>
                <span>{userDataFull?.status}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                <span className="font-semibold">Phone Number</span>
                <span>{userDataFull?.phoneNumber}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                <span className="font-semibold">User Type</span>
                <span>{userDataFull?.gender}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-2 px-3 rounded-lg border-[#00000042]">
                <span className="font-semibold">Joining Date</span>
                <span>{moment(userDataFull?.createdAt).format("DD MMM YYYY")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Users;
