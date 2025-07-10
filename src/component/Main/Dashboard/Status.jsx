import { IoLogoEuro } from "react-icons/io";
import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";
import dashboardIcon from "/public/logo/dashboard-icon.png";
import subsciption from "/public/logo/subscribtion.png";
import { FaArrowTrendUp } from "react-icons/fa6";

const Status = () => {
  const { data, isLoading } = useGetDashboardStatusQuery();

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

      {/* Total Renter User Card */}
      <div className="shadow-[0_4px_10px_rgba(0,0,0,0.2)] p-5 rounded-lg border-2 border-[#ffd400] bg-white">
        <div className="flex items-center gap-5 ">
          <img src={dashboardIcon} className="w-16" alt="" />
          <h2 className="text-2xl font-semibold">Total Users</h2>
        </div>
        <div className="flex items-center mt-5 gap-3">
          <h1 className="text-4xl font-semibold text-[#222222]">
            {data?.totalNumberOfUser || "500"}
          </h1>
          <p className="bg-[#ffd4001f] text-[#ffd400] rounded-lg px-2 py-1 flex items-center gap-1"> <FaArrowTrendUp className="text-[#cf7e13]" /> 20%</p>
        </div>
      </div>
      {/* Total Renter User Card */}
      <div className="shadow-[0_4px_10px_rgba(0,0,0,0.2)] p-5 rounded-lg border-2 border-[#ffd400] bg-white">
        <div className="flex items-center gap-5 ">
          {/* <img src={dashboardIcon} className="w-16" alt="" /> */}
          <div className="w-16 h-16 flex justify-center items-center rounded-lg bg-[#ffd400]">
            <IoLogoEuro className="text-2xl text-white" />
          </div>
          <h2 className="text-2xl font-semibold">Total Earning</h2>
        </div>
        <div className="flex items-center mt-5 gap-3">
          <h1 className="text-4xl font-semibold text-[#222222]">
            {data?.totalNumberOfUser || "500"}
          </h1>
        </div>
      </div>
      {/* Total Renter User Card */}
      <div className="shadow-[0_4px_10px_rgba(0,0,0,0.2)] p-5 rounded-lg border-2 border-[#ffd400] bg-white">
        <div className="flex items-center gap-5">
          <img src={subsciption} className="w-16" alt="" />
          <h2 className="text-2xl font-semibold">Total Subscribers </h2>
        </div>
        <div className="flex items-center mt-5 gap-3">
          <h1 className="text-4xl font-semibold text-[#222222]">
            {data?.totalNumberOfUser || "500"}
          </h1>
        </div>
      </div>


    </div>
  );
};

export default Status;