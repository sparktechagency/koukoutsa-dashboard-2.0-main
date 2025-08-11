import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { Spin } from "antd"; // Importing Spin
import { useEffect, useState } from "react";
import { useGetTermsAndConditionsQuery } from "../../redux/features/setting/settingApi";
import he from "he"; // Import the 'he' package to decode HTML entities

const TermsconditionPage = () => {
  const { data: termsAndConditions, isLoading, refetch } = useGetTermsAndConditionsQuery();
  const [decodedContent, setDecodedContent] = useState("");

  useEffect(() => {
    // Refetch data on mount
    refetch();

    // Decode the HTML content if available
    if (termsAndConditions?.data?.attributes?.content) {
      const decoded = he.decode(termsAndConditions?.data?.attributes?.content); // Decode HTML entities
      setDecodedContent(decoded); // Store decoded content in state
    }
  }, [termsAndConditions, refetch]);

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <IoChevronBack className="text-2xl" />
          <h1 className="text-2xl font-semibold">Terms of Conditions</h1>
        </Link>
        <Link to={"/settings/edit-terms-conditions/11"}>
          <button
            className="bg-[#ffd400] text-white flex items-center gap-2 p-2 rounded-md font-bold"
            border
          >
            <TbEdit className="size-5" />
            <span>Edit</span>
          </button>
        </Link>
      </div>

      {/* Show Spin loader if data is loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full h-full ml-3">
          {/* Render decoded HTML content */}
          <div dangerouslySetInnerHTML={{ __html: decodedContent }} />
        </div>
      )}
    </section>
  );
};

export default TermsconditionPage;
